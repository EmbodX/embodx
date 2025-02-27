use bevy::prelude::*;
use bevy_editor_pls::editor::EditorInternalState;
use bevy_editor_pls::editor_window::{open_floating_window, EditorWindowContext};
use bevy_editor_pls::{editor_window::EditorWindow, AddEditorWindow};

use crate::robot_vis::visuals::UrdfLoadRequest;

#[cfg(feature = "gspat")]
use crate::scene::gaussian_splatting::GaussianSplattingSceneLoadRequest;

use super::robot_state_setter::EditorState;

pub(super) fn plugin(app: &mut App) {
    app.add_editor_window::<ShowcaseWindow>();
}

pub(crate) struct ShowcaseWindow;

impl EditorWindow for ShowcaseWindow {
    type State = EditorState;

    const NAME: &'static str = "Robot Config";
    const DEFAULT_SIZE: (f32, f32) = (200., 150.);

    fn app_setup(app: &mut App) {
        app.add_systems(Startup, |internal_state: ResMut<EditorInternalState>| {
            open_floating_window::<Self>(internal_state.into_inner());
        });
    }

    fn ui(world: &mut World, mut cx: EditorWindowContext, ui: &mut egui::Ui) {
        // TODO: look into file picker: https://github.com/kirjavascript/trueLMAO/blob/master/frontend/src/widgets/file.rs

        let urdf_file_root = "https://cdn.jsdelivr.net/gh/Daniella1/urdf_files_dataset@81f4cdac42c3a51ba88833180db5bf3697988c87/urdf_files/random";

        let editor_state = &mut cx.state_mut::<Self>().unwrap();

        ui.text_edit_singleline(&mut editor_state.robot_path);
        if ui.button("load robot").clicked() {
            world.send_event(UrdfLoadRequest::from_file(editor_state.robot_path.clone()));
        }

        if ui.button("load panda").clicked() {
            world.send_event(UrdfLoadRequest::from_file(
                format!("{urdf_file_root}/robot-assets/franka_panda/panda.urdf").to_string(),
            ));
        }
        if ui.button("load robot ur5").clicked() {
            world.send_event(UrdfLoadRequest::from_file(
                format!("{urdf_file_root}/robot-assets/ur5/ur5_gripper.urdf").to_string(),
            ));
        }
        if ui.button("load robot ur10").clicked() {
            world.send_event(UrdfLoadRequest::from_file(
                format!("{urdf_file_root}/robot-assets/ur10/ur10_robot.urdf").to_string(),
            ));
        }
        if ui.button("load robot kinova").clicked() {
            world.send_event(UrdfLoadRequest::from_file(
                format!("{urdf_file_root}/robot-assets/kinova/kinova.urdf").to_string(),
            ));
        }
        if ui.button("load robot spot").clicked() {
            world.send_event(UrdfLoadRequest::from_file(
                format!("{urdf_file_root}/spot_ros/spot_description/urdf/spot.urdf").to_string(),
            ));
        }
        #[cfg(feature = "gspat")]
        if ui
            .button("load gaussian splatting scene (garden)")
            .clicked()
        {
            world.send_event(GaussianSplattingSceneLoadRequest {
                path: "https://files.au-1.osf.io/v1/resources/954rg/providers/osfstorage/674592a0367509e10b078938?.ply"
                    .to_string(),
                    transform: Transform {
                        translation: Vec3::new(-0.2, 1.0, 0.3),
                        rotation: Quat::from_euler(EulerRot::XYZ, 0.5, -0.3, 3.3),
                        scale: Vec3::splat(0.3),
                        // ..default()
                    }
            },
            );
        }
    }
}
