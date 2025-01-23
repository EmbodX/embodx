use bevy::{pbr::DirectionalLightShadowMap, prelude::*, render::camera::CameraUpdateSystem};
use bevy_panorbit_camera::{PanOrbitCamera, PanOrbitCameraSystemSet};
use dimensify::{
    camera::main_camera::MainCamera,
    robot::urdf_loader::{UrdfLoadRequest, UrdfLoadRequestParams},
};
use rapier3d::{math::Vector, prelude::SharedShape};

use std::f32::consts::*;

use bevy::{
    core_pipeline::prepass::{DeferredPrepass, DepthPrepass, MotionVectorPrepass, NormalPrepass},
    pbr::{CascadeShadowConfigBuilder, DefaultOpaqueRendererMethod},
};

pub fn plugin(app: &mut App) {
    app
        // .insert_resource(Msaa::Off)
        // .insert_resource(DefaultOpaqueRendererMethod::deferred())
        // .insert_resource(DirectionalLightShadowMap { size: 4096 })
        // .add_plugins(DefaultPlugins)
        .insert_resource(Pause(true))
        .add_systems(
            Startup,
            (
                setup,
                // add_floor
            ),
        )
        .add_systems(Startup, |mut writer: EventWriter<UrdfLoadRequest>| {
            writer.send(UrdfLoadRequest::new(
                "https://cdn.jsdelivr.net/gh/Daniella1/urdf_files_dataset@81f4cdac42c3a51ba88833180db5bf3697988c87/urdf_files/random/robot-assets/franka_panda/panda.urdf"
                    .to_string(),
                Some(
                    UrdfLoadRequestParams::default()
                        .fixed_base()
                        .with_collision_links(vec![
                            ("panda_hand".to_string(), "panda_link7".to_string()),
                            (
                                "panda_leftfinger".to_string(),
                                "panda_rightfinger".to_string(),
                            ),
                        ]),
                ),
            ));
        })
        .add_systems(Update, (animate_light_direction, switch_mode))
        .add_systems(PostStartup, setup_camera_transform)
        .add_systems(
            Update,
            limit_camera_transform
                .after(PanOrbitCameraSystemSet)
                .before(CameraUpdateSystem)
                .before(TransformSystem::TransformPropagate),
        );
}

pub fn limit_camera_transform(
    mut q_main_camera: Query<&mut PanOrbitCamera, (With<MainCamera>, With<Camera>)>,
) {
    let mut cam = q_main_camera.single_mut();
    cam.target_focus = cam
        .target_focus
        .clamp(Vec3::new(-7.0, -0.05, -15.0), Vec3::new(7.0, 0.05, 3.));
}

pub fn setup_camera_transform(
    mut q_main_camera: Query<&mut PanOrbitCamera, (With<MainCamera>, With<Camera>)>,
) {
    let mut cam = q_main_camera.single_mut();

    cam.pitch_lower_limit = Some(0.1);
    cam.zoom_upper_limit = Some(13.0);
    cam.zoom_lower_limit = 0.5;
}

fn setup(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut materials: ResMut<Assets<StandardMaterial>>,
    mut meshes: ResMut<Assets<Mesh>>,
) {
    commands.spawn(DirectionalLightBundle {
        directional_light: DirectionalLight {
            illuminance: 15_000.,
            shadows_enabled: true,
            ..default()
        },
        cascade_shadow_config: CascadeShadowConfigBuilder {
            // wgl2 only support 1 cascade
            num_cascades: 1,
            maximum_distance: 20.,
            overlap_proportion: 0.4,
            first_cascade_far_bound: 25.,
            // first_cascade_far_bound: 1.,r
            ..default()
        }
        .into(),
        transform: Transform::from_rotation(Quat::from_euler(EulerRot::ZYX, 0.0, PI, -FRAC_PI_4)),
        // transform: Transform::from_rotation(Quat::from_euler(EulerRot::ZYX, 0.0, 0.0, -FRAC_PI_4)),
        ..default()
    });
    commands.insert_resource(DirectionalLightShadowMap { size: 8192 });

    commands.spawn(SceneBundle {
        scene: asset_server.load(GltfAssetLabel::Scene(0).from_asset("scene/room_scene.glb")),
        transform: Transform::from_xyz(0., 0., 1.),
        ..default()
    });

    // Example instructions
    commands.spawn(
        TextBundle::from_section(
            "",
            TextStyle {
                font_size: 15.,
                ..default()
            },
        )
        .with_style(Style {
            position_type: PositionType::Absolute,
            top: Val::Px(12.0),
            left: Val::Px(12.0),
            ..default()
        }),
    );
}

#[derive(Resource)]
struct Pause(bool);

fn animate_light_direction(
    time: Res<Time>,
    mut query: Query<&mut Transform, With<DirectionalLight>>,
    pause: Res<Pause>,
) {
    if pause.0 {
        return;
    }
    for mut transform in &mut query {
        transform.rotate_y(time.delta_seconds() * PI / 5.0);
    }
}

#[derive(Component)]
struct Spin {
    speed: f32,
}

#[allow(clippy::too_many_arguments)]
fn switch_mode(
    mut text: Query<&mut Text>,
    keys: Res<ButtonInput<KeyCode>>,
    mut pause: ResMut<Pause>,
    mut hide_ui: Local<bool>,
) {
    let mut text = text.single_mut();
    let text = &mut text.sections[0].value;

    text.clear();

    if keys.just_pressed(KeyCode::Space) {
        pause.0 = !pause.0;
    }

    // if keys.just_pressed(KeyCode::Digit1) {
    //     *mode = DefaultRenderMode::Deferred;
    //     default_opaque_renderer_method.set_to_deferred();
    //     println!("DefaultOpaqueRendererMethod: Deferred");
    //     for _ in materials.iter_mut() {}
    //     for camera in &cameras {
    //         commands.entity(camera).remove::<NormalPrepass>();
    //         commands.entity(camera).insert(DepthPrepass);
    //         commands.entity(camera).insert(MotionVectorPrepass);
    //         commands.entity(camera).insert(DeferredPrepass);
    //     }
    // }
    // if keys.just_pressed(KeyCode::Digit2) {
    //     *mode = DefaultRenderMode::Forward;
    //     default_opaque_renderer_method.set_to_forward();
    //     println!("DefaultOpaqueRendererMethod: Forward");
    //     for _ in materials.iter_mut() {}
    //     for camera in &cameras {
    //         commands.entity(camera).remove::<NormalPrepass>();
    //         commands.entity(camera).remove::<DepthPrepass>();
    //         commands.entity(camera).remove::<MotionVectorPrepass>();
    //         commands.entity(camera).remove::<DeferredPrepass>();
    //     }
    // }
    // if keys.just_pressed(KeyCode::Digit3) {
    //     *mode = DefaultRenderMode::ForwardPrepass;
    //     default_opaque_renderer_method.set_to_forward();
    //     println!("DefaultOpaqueRendererMethod: Forward + Prepass");
    //     for _ in materials.iter_mut() {}
    //     for camera in &cameras {
    //         commands.entity(camera).insert(NormalPrepass);
    //         commands.entity(camera).insert(DepthPrepass);
    //         commands.entity(camera).insert(MotionVectorPrepass);
    //         commands.entity(camera).remove::<DeferredPrepass>();
    //     }
    // }

    if keys.just_pressed(KeyCode::KeyH) {
        *hide_ui = !*hide_ui;
    }

    if !*hide_ui {
        text.push_str("(H) Hide UI\n");
        text.push_str("(Space) Play/Pause\n\n");

        text.push_str("Diagrammatic Teaching:\n");

        text.push_str(
            "1. Hold (Alt) and draw (with Left Click) from the robot hand to your location\n",
        );
        text.push_str("2. Press (Enter) to confirm with snapshot\n");
        text.push_str("3. Rotate to a different angle and draw to connect the two points again\n");
        text.push_str("4. Press (Backspace) to generate\n");
        text.push_str("5. Press (G) to execute trajectory\n");
    }
}
