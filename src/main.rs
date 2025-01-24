use bevy::{asset::AssetMetaCheck, log::LogPlugin, prelude::*, scene::ron::de};
use dimensify::WebAssetPlugin;
use embodx::RobotSimPlugin;
use eyre::Result;

// mod web_demo;

// use dimensify::test_scene;
// use dimensify::util;

fn main() -> Result<()> {
    embodx::util::initialise()?;

    #[cfg(target_arch = "wasm32")]
    let primary_window = Some(Window {
        fit_canvas_to_parent: true,
        canvas: Some("#bevy".to_string()),
        mode: bevy::window::WindowMode::Windowed,
        prevent_default_event_handling: true,
        title: "EmbodX".to_string(),

        #[cfg(feature = "perftest")]
        present_mode: bevy::window::PresentMode::AutoNoVsync,
        #[cfg(not(feature = "perftest"))]
        present_mode: bevy::window::PresentMode::AutoVsync,

        ..default()
    });

    #[cfg(not(target_arch = "wasm32"))]
    let primary_window = Some(Window {
        mode: bevy::window::WindowMode::Windowed,
        prevent_default_event_handling: false,
        // resolution: (config.width, config.height).into(),
        resizable: true,
        // cursor_visible: true,
        // present_mode: PresentMode::AutoVsync,
        // This will spawn an invisible
        fit_canvas_to_parent: true, // no more need to handle this myself with wasm binding: https://github.com/bevyengine/bevy/commit/fed93a0edce9d66586dc70c1207a2092694b9a7d

        title: "EmbodX".to_string(),
        present_mode: bevy::window::PresentMode::AutoVsync,
        ..default()
    });

    let mut app = App::new();
    app.add_plugins(WebAssetPlugin {
        cache_resource: true,
        reject_meta_request: true,
    });

    #[allow(unused_mut)] // there are other plugins that are added conditionally
    let mut default_plugin = DefaultPlugins.set(WindowPlugin {
        primary_window,
        ..default()
    });

    #[cfg(target_arch = "wasm32")]
    {
        // the meta check most of the time doesn't work on webserver
        default_plugin = default_plugin.set(AssetPlugin {
            meta_check: AssetMetaCheck::Never,
            ..default()
        });
    }

    // only supported on the web
    #[cfg(target_arch = "wasm32")]
    {
        use bevy_xr_state::xr_plugin;
        use dimensify::{
            robot::control::end_effector::{EndEffectorMode, EndEffectorTarget},
            robot::RobotState,
        };
        app.add_plugins(xr_plugin::plugin);

        fn update_target(
            mut commands: Commands,
            device_state: Res<xr_plugin::MobileDeviceState>,
            mut robot_state: Query<(Entity), With<RobotState>>,
            mut end_eff: Query<(&mut Transform, &mut EndEffectorTarget)>,
            mut meshes: ResMut<Assets<Mesh>>,
            // keep track of whether the button had just toggled
            // mut last_control_state: Local<(bool, bool)>,
            // keep track of when the control state is toggled, as our ref frame
            mut reference_origin: Local<(Vec3, Quat)>,
        ) {
            // // just toggled on. save reference frame
            // if !last_control_state.0 && device_state.control_position {
            //     reference_origin.0 = device_state.translation;
            // }
            // if !last_control_state.1 && device_state.control_orientation {
            //     reference_origin.1 = device_state.rotation;
            // }
            // *last_control_state = (
            //     device_state.control_position, device_state.control_orientation
            // );
            /////////////////////////////////////////////

            let end_eff = end_eff.iter_mut().last();

            if let Some((mut transform, mut ee_target)) = end_eff {
                if device_state.control_position {
                    ee_target.translation = match ee_target.translation_mode {
                        EndEffectorMode::Absolute => Some(device_state.translation),
                        EndEffectorMode::ApplyAsDelta => {
                            Some(device_state.translation - reference_origin.0)
                        }
                    }
                }
                if device_state.control_orientation {
                    ee_target.rotation = match ee_target.rotation_mode {
                        EndEffectorMode::Absolute => Some(device_state.rotation),
                        // TODO: I think apply as delta is not working correctly.
                        EndEffectorMode::ApplyAsDelta => {
                            Some(device_state.rotation * reference_origin.1.inverse())
                        }
                    }
                }

                //////////////////////////////////////////
                // just for visualisation
                transform.translation = device_state.translation;
                transform.rotation = device_state.rotation;
            } else {
                // spawn a new end effector target, which should be active on next tick
                commands
                    .spawn(EndEffectorTarget {
                        translation: None,
                        rotation: None,
                        translation_mode: EndEffectorMode::ApplyAsDelta,
                        // rotation_mode: EndEffectorMode::ApplyAsDelta,
                        rotation_mode: EndEffectorMode::Absolute,
                        ..Default::default()
                    })
                    .insert(TransformBundle {
                        // local: transform_origin,
                        ..Default::default()
                    });
            }
            reference_origin.0 = device_state.translation;
            reference_origin.1 = device_state.rotation;
        }

        app.add_systems(
            Update,
            update_target.run_if(resource_exists::<xr_plugin::MobileDeviceState>),
        );
    }
    use bevy_egui::{egui, EguiContexts, EguiPlugin};
    use dimensify::camera::window_camera;

    app.add_plugins(default_plugin.set(LogPlugin {
        filter: "error,bevy_render=info,bevy_ecs=trace,bevy=info,k=error".to_string(),
        ..default()
    }))
    // .add_plugins(EguiPlugin)
    .add_plugins(RobotSimPlugin)
    // FIXME move window_cam to separate module
    .add_systems(Update, window_camera::render_floating_camera_to_window)
    .run();

    Ok(())
}
