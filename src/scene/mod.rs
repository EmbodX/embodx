use bevy::{ecs::system::SystemParam, log::tracing_subscriber::filter, prelude::*, utils::HashSet};
use bevy_editor_pls::{
    editor_window::{EditorWindow, EditorWindowContext},
    AddEditorWindow,
};
use bevy_rapier3d::prelude::*;

pub mod collidable;

pub fn plugin(app: &mut App) {
    let mut config = RapierConfiguration::new(1.0); // default is 1.0 by default in 3D
                                                    // default disable the physics pipeline step simulation. We will manually call it when needed.
    config.physics_pipeline_active = false;

    app //
        .insert_resource(config)
        .add_plugins(RapierPhysicsPlugin::<collidable::IgnoredCollidersFilter>::default())
        .register_type::<collidable::IgnoredColliders>();
}
