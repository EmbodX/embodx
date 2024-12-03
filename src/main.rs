use bevy::{log::LogPlugin, prelude::*};
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
        // This will spawn an invisible window
        fit_canvas_to_parent: true, // no more need to handle this myself with wasm binding: https://github.com/bevyengine/bevy/commit/fed93a0edce9d66586dc70c1207a2092694b9a7d

        title: "EmbodX".to_string(),
        present_mode: bevy::window::PresentMode::AutoVsync,
        ..default()
    });

    let mut app = App::new();
    app.add_plugins(WebAssetPlugin {
        cache_resource: true,
    })
    .add_plugins(
        DefaultPlugins
            .set(WindowPlugin {
                primary_window,
                ..default()
            })
            .set(LogPlugin {
                filter: "error,bevy_render=info,bevy_ecs=trace,bevy=info,k=error".to_string(),
                ..default()
            }),
    )
    .add_plugins(RobotSimPlugin)
    .add_plugins(dimensify::ui::editor_pls_plugins )
    .run();

    Ok(())
}
