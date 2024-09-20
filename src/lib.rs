#![allow(clippy::too_many_arguments)]
extern crate nalgebra as na;

pub use crate::graphics::{BevyMaterial, GraphicsManager};
pub use crate::harness::plugin::HarnessPlugin;
pub use crate::physics::PhysicsState;
pub use crate::plugin::TestbedPlugin;
pub use crate::testbed::{Testbed, TestbedApp, TestbedGraphics, TestbedState};
pub use bevy::prelude::KeyCode;

mod camera3d;
mod debug_render;
mod graphics;
pub mod harness;
mod mouse;
pub mod objects;
pub mod physics;
mod plugin;
mod testbed;
mod ui;

pub mod math {
    pub type Isometry<N> = na::Isometry3<N>;
    pub type Vector<N> = na::Vector3<N>;
    pub type Point<N> = na::Point3<N>;
    pub type Translation<N> = na::Translation3<N>;
}
