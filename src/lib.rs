use bevy::{
    app::PluginGroupBuilder,
    asset::LoadState,
    log::LogPlugin,
    prelude::*,
    render::render_resource::{TextureViewDescriptor, TextureViewDimension},
    transform::commands,
};
// use bevy_egui::EguiPlugin;
// use bevy_web_asset::WebAssetPlugin;
use rapier3d::parry::simba::scalar::SupersetOf;

use dimensify::{camera::main_camera::MainCamera, SimPlugin};

// pub mod assets_loader;
// pub mod camera;
// pub mod collision_checker;
// pub mod constants;
// pub mod graphics;
// pub mod robot;
// pub mod robot_vis;
// pub mod scene;
pub mod sketching;
pub mod test_scene;
// pub mod ui;
pub mod util;
// pub mod camera3d;

pub struct RobotSimPlugin;

#[cfg(not(target_arch = "wasm32"))]
fn insert_skybox(app: &mut App) {
    use bevy_atmosphere::plugin::AtmosphereCamera;

    app.add_systems(
        PostStartup,
        |mut commands: Commands,
         q_main_camera: Query<Entity, (With<MainCamera>, Without<AtmosphereCamera>)>| {
            for main_camera in q_main_camera.iter() {
                commands
                    .entity(main_camera)
                    .insert(AtmosphereCamera::default());
                // AtmosphereCamera::default();
            }
        },
    );
}

#[cfg(target_arch = "wasm32")]
fn insert_skybox(app: &mut App) {
    use bevy::core_pipeline::Skybox;

    /// Resource to track the loading state of the cubemap texture
    /// and to reinterpret it as a cubemap texture.
    #[derive(Resource)]
    struct PendingCubemapReinterpret {
        image_handle: Handle<Image>,
    }

    fn setup(
        mut commands: Commands,
        asset_server: Res<AssetServer>,
        q_main_camera: Query<Entity, With<MainCamera>>,
    ) {
        let skybox_handle = asset_server.load("texture/skybox_cubemap.jpg");

        for main_camera in q_main_camera.iter() {
            commands.entity(main_camera).insert(Skybox {
                image: skybox_handle.clone(),
                brightness: 1000.0,
            });
        }

        commands.insert_resource(PendingCubemapReinterpret {
            image_handle: skybox_handle,
        });
    }

    fn reinterpret_image(
        asset_server: Res<AssetServer>,
        mut commands: Commands,
        mut images: ResMut<Assets<Image>>,
        cubemap: ResMut<PendingCubemapReinterpret>,
        mut skyboxes: Query<&mut Skybox>,
    ) {
        if asset_server.load_state(&cubemap.image_handle) == LoadState::Loaded {
            let image = images.get_mut(&cubemap.image_handle).unwrap();
            // NOTE: PNGs do not have any metadata that could indicate they contain a cubemap texture,
            // so they appear as one texture. The following code reconfigures the texture as necessary.
            if image.texture_descriptor.array_layer_count() == 1 {
                image.reinterpret_stacked_2d_as_array(image.height() / image.width());
                image.texture_view_descriptor = Some(TextureViewDescriptor {
                    dimension: Some(TextureViewDimension::Cube),
                    ..default()
                });
            }

            for mut skybox in &mut skyboxes {
                skybox.image = cubemap.image_handle.clone();
            }

            commands.remove_resource::<PendingCubemapReinterpret>();
        }
    }

    // begin loading
    app.add_systems(PostStartup, setup);
    app.add_systems(
        Update,
        reinterpret_image.run_if(resource_exists::<PendingCubemapReinterpret>),
    );
}

impl PluginGroup for RobotSimPlugin {
    fn build(self) -> PluginGroupBuilder {
        let mut group = PluginGroupBuilder::start::<Self>();

        group = group
            .add_group(SimPlugin)
            .add(test_scene::plugin)
            .add(sketching::plugin);
        #[cfg(not(target_arch = "wasm32"))]
        {
            use bevy_atmosphere::plugin::AtmospherePlugin;

            group = group.add(AtmospherePlugin);
        }
        group = group.add(insert_skybox);

        // #[cfg(target_arch = "wasm32")]
        // let primary_window = Some(Window {
        //     fit_canvas_to_parent: true,
        //     canvas: Some("#bevy".to_string()),
        //     mode: bevy::window::WindowMode::Windowed,
        //     prevent_default_event_handling: true,
        //     title: "RobotSim".to_string(),

        //     #[cfg(feature = "perftest")]
        //     present_mode: bevy::window::PresentMode::AutoNoVsync,
        //     #[cfg(not(feature = "perftest"))]
        //     present_mode: bevy::window::PresentMode::AutoVsync,

        //     ..default()
        // });

        // #[cfg(not(target_arch = "wasm32"))]
        // let primary_window = Some(Window {
        //     mode: bevy::window::WindowMode::Windowed,
        //     prevent_default_event_handling: false,
        //     // resolution: (config.width, config.height).into(),
        //     resizable: true,
        //     // cursor_visible: true,
        //     // present_mode: PresentMode::AutoVsync,
        //     // This will spawn an invisible window
        //     fit_canvas_to_parent: true, // no more need to handle this myself with wasm binding: https://github.com/bevyengine/bevy/commit/fed93a0edce9d66586dc70c1207a2092694b9a7d

        //     title: "RobotSim".to_string(),
        //     present_mode: bevy::window::PresentMode::AutoVsync,
        //     ..default()
        // });

        // group = group
        //     .add(WebAssetPlugin {
        //         cache_resource: true,
        //     })
        //     .add_group(
        //         DefaultPlugins
        //             .set(WindowPlugin {
        //                 primary_window,
        //                 ..default()
        //             })
        //             .set(LogPlugin {
        //                 filter: "bevy_render=info,bevy_ecs=trace,bevy=info".to_string(),
        //                 ..default()
        //             }),
        //     )
        //     // .add_plugins(web_demo::plugin)
        //     .add(graphics::plugin)
        //     .add(robot::plugin::plugin)
        //     .add(ui::plugin);

        // #[cfg(feature = "gspat")]
        // {
        //     // use scene::gaussian_splatting::plugin;
        //     group = group.add(scene::gaussian_splatting::plugin);
        // }

        // // if !group.is_in_subset::<EguiPlugin>() {
        // //     group = group.add(EguiPlugin);
        // // }

        // group = group
        //     // .add_plugins(EguiPlugin)
        //     .add(camera::plugin) // camera needs egui to be added first
        //     .add(scene::plugin)
        //     .add(robot_vis::plugin)
        //     .add(sketching::plugin);

        group
    }
}
