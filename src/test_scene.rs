use bevy::{ecs::system::EntityCommands, prelude::*, transform::commands};
use bevy_rapier3d::prelude::Collider;
use dimensify::constants::SCENE_FLOOR_NAME;
use dimensify::graphics::helpers::generate_collider_mesh;
use k::nalgebra::UnitVector3;
use rapier3d::{
    math::Vector,
    prelude::{ColliderBuilder, HalfSpace, Shape, ShapeType, SharedShape},
};

use std::f32::consts::*;

use bevy::{
    core_pipeline::prepass::{DeferredPrepass, DepthPrepass, MotionVectorPrepass, NormalPrepass},
    pbr::{
        CascadeShadowConfigBuilder, DefaultOpaqueRendererMethod, NotShadowCaster,
        OpaqueRendererMethod,
    },
};

pub fn plugin(app: &mut App) {
    app
        // .insert_resource(Msaa::Off)
        // .insert_resource(DefaultOpaqueRendererMethod::deferred())
        // .insert_resource(DirectionalLightShadowMap { size: 4096 })
        // .add_plugins(DefaultPlugins)
        .insert_resource(Pause(true))
        .add_systems(Startup, (setup,))
        .add_systems(Update, (animate_light_direction, switch_mode, spin));
}

fn add_floor(
    commands: &mut Commands,
    materials: &mut Assets<StandardMaterial>,
    meshes: &mut Assets<Mesh>,
) {
    let mut forward_mat: StandardMaterial = Color::srgb(0.1, 0.2, 0.1).into();
    forward_mat.opaque_render_method = OpaqueRendererMethod::Forward;
    let forward_mat_h = materials.add(forward_mat);

    let plane = SharedShape::halfspace(Vector::y_axis());

    // let mut blueprint = ColliderBuilder::new(plane);

    commands
        .spawn(PbrBundle {
            mesh: meshes.add(Plane3d::default().mesh().size(50.0, 50.0)),
            // mesh: meshes.add(Plane3d::default().mesh().size(50.0, 50.0)),
            material: forward_mat_h.clone(),
            ..default()
        })
        .insert(Collider::from(plane))
        .insert(Name::new(SCENE_FLOOR_NAME));
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
            num_cascades: 3,
            maximum_distance: 10.0,
            ..default()
        }
        .into(),
        transform: Transform::from_rotation(Quat::from_euler(EulerRot::ZYX, 0.0, 0.0, -FRAC_PI_4)),
        ..default()
    });

    // FlightHelmet
    // let helmet_scene = asset_server
    //     .load(GltfAssetLabel::Scene(0).from_asset("models/FlightHelmet/FlightHelmet.gltf"));

    // commands.spawn(SceneBundle {
    //     scene: helmet_scene.clone(),
    //     ..default()
    // });
    // commands.spawn(SceneBundle {
    //     scene: helmet_scene,
    //     transform: Transform::from_xyz(-4.0, 0.0, -3.0),
    //     ..default()
    // });

    // Plane
    // commands.spawn(PbrBundle {
    //     mesh: meshes.add(Plane3d::default().mesh().size(50.0, 50.0)),
    //     material: forward_mat_h.clone(),
    //     ..default()
    // });

    add_floor(&mut commands, &mut materials, &mut meshes);

    // let cube_h = meshes.add(Cuboid::new(0.1, 0.1, 0.1));
    // let sphere_h = meshes.add(Sphere::new(0.125).mesh().uv(32, 18));

    // // Cubes
    // commands.spawn(PbrBundle {
    //     mesh: cube_h.clone(),
    //     material: forward_mat_h.clone(),
    //     transform: Transform::from_xyz(-0.3, 0.5, -0.2),
    //     ..default()
    // });
    // commands.spawn(PbrBundle {
    //     mesh: cube_h,
    //     material: forward_mat_h,
    //     transform: Transform::from_xyz(0.2, 0.5, 0.2),
    //     ..default()
    // });

    // let sphere_color = Color::srgb(10.0, 4.0, 1.0);
    // let sphere_pos = Transform::from_xyz(0.4, 0.5, -0.8);
    // // Emissive sphere
    // let mut unlit_mat: StandardMaterial = sphere_color.into();
    // unlit_mat.unlit = true;
    // commands.spawn((
    //     PbrBundle {
    //         mesh: sphere_h.clone(),
    //         material: materials.add(unlit_mat),
    //         transform: sphere_pos,
    //         ..default()
    //     },
    //     NotShadowCaster,
    // ));
    // // Light
    // commands.spawn(PointLightBundle {
    //     point_light: PointLight {
    //         intensity: 800.0,
    //         radius: 0.125,
    //         shadows_enabled: true,
    //         color: sphere_color,
    //         ..default()
    //     },
    //     transform: sphere_pos,
    //     ..default()
    // });

    // // Spheres
    // for i in 0..6 {
    //     let j = i % 3;
    //     let s_val = if i < 3 { 0.0 } else { 0.2 };
    //     let material = if j == 0 {
    //         materials.add(StandardMaterial {
    //             base_color: Color::srgb(s_val, s_val, 1.0),
    //             perceptual_roughness: 0.089,
    //             metallic: 0.0,
    //             ..default()
    //         })
    //     } else if j == 1 {
    //         materials.add(StandardMaterial {
    //             base_color: Color::srgb(s_val, 1.0, s_val),
    //             perceptual_roughness: 0.089,
    //             metallic: 0.0,
    //             ..default()
    //         })
    //     } else {
    //         materials.add(StandardMaterial {
    //             base_color: Color::srgb(1.0, s_val, s_val),
    //             perceptual_roughness: 0.089,
    //             metallic: 0.0,
    //             ..default()
    //         })
    //     };
    //     commands.spawn(PbrBundle {
    //         mesh: sphere_h.clone(),
    //         material,
    //         transform: Transform::from_xyz(
    //             j as f32 * 0.25 + if i < 3 { -0.15 } else { 0.15 } - 0.4,
    //             0.125,
    //             -j as f32 * 0.25 + if i < 3 { -0.15 } else { 0.15 } + 0.4,
    //         ),
    //         ..default()
    //     });
    // }

    // // sky
    // commands.spawn((
    //     PbrBundle {
    //         mesh: meshes.add(Cuboid::new(2.0, 1.0, 1.0)),
    //         material: materials.add(StandardMaterial {
    //             base_color: Srgba::hex("888888").unwrap().into(),
    //             unlit: true,
    //             cull_mode: None,
    //             ..default()
    //         }),
    //         transform: Transform::from_scale(Vec3::splat(1_000_000.0)),
    //         ..default()
    //     },
    //     NotShadowCaster,
    //     NotShadowReceiver,
    // ));

    // Example instructions
    commands.spawn(
        TextBundle::from_section("", TextStyle::default()).with_style(Style {
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

fn spin(time: Res<Time>, mut query: Query<(&mut Transform, &Spin)>, pause: Res<Pause>) {
    if pause.0 {
        return;
    }
    for (mut transform, spin) in query.iter_mut() {
        transform.rotate_local_y(spin.speed * time.delta_seconds());
        transform.rotate_local_x(spin.speed * time.delta_seconds());
        transform.rotate_local_z(-spin.speed * time.delta_seconds());
    }
}

#[derive(Resource, Default)]
enum DefaultRenderMode {
    #[default]
    Deferred,
    Forward,
    ForwardPrepass,
}

#[allow(clippy::too_many_arguments)]
fn switch_mode(
    mut text: Query<&mut Text>,
    mut commands: Commands,
    keys: Res<ButtonInput<KeyCode>>,
    mut default_opaque_renderer_method: ResMut<DefaultOpaqueRendererMethod>,
    mut materials: ResMut<Assets<StandardMaterial>>,
    cameras: Query<Entity, With<Camera>>,
    mut pause: ResMut<Pause>,
    mut hide_ui: Local<bool>,
    mut mode: Local<DefaultRenderMode>,
) {
    let mut text = text.single_mut();
    let text = &mut text.sections[0].value;

    text.clear();

    if keys.just_pressed(KeyCode::Space) {
        pause.0 = !pause.0;
    }

    if keys.just_pressed(KeyCode::Digit1) {
        *mode = DefaultRenderMode::Deferred;
        default_opaque_renderer_method.set_to_deferred();
        println!("DefaultOpaqueRendererMethod: Deferred");
        for _ in materials.iter_mut() {}
        for camera in &cameras {
            commands.entity(camera).remove::<NormalPrepass>();
            commands.entity(camera).insert(DepthPrepass);
            commands.entity(camera).insert(MotionVectorPrepass);
            commands.entity(camera).insert(DeferredPrepass);
        }
    }
    if keys.just_pressed(KeyCode::Digit2) {
        *mode = DefaultRenderMode::Forward;
        default_opaque_renderer_method.set_to_forward();
        println!("DefaultOpaqueRendererMethod: Forward");
        for _ in materials.iter_mut() {}
        for camera in &cameras {
            commands.entity(camera).remove::<NormalPrepass>();
            commands.entity(camera).remove::<DepthPrepass>();
            commands.entity(camera).remove::<MotionVectorPrepass>();
            commands.entity(camera).remove::<DeferredPrepass>();
        }
    }
    if keys.just_pressed(KeyCode::Digit3) {
        *mode = DefaultRenderMode::ForwardPrepass;
        default_opaque_renderer_method.set_to_forward();
        println!("DefaultOpaqueRendererMethod: Forward + Prepass");
        for _ in materials.iter_mut() {}
        for camera in &cameras {
            commands.entity(camera).insert(NormalPrepass);
            commands.entity(camera).insert(DepthPrepass);
            commands.entity(camera).insert(MotionVectorPrepass);
            commands.entity(camera).remove::<DeferredPrepass>();
        }
    }

    if keys.just_pressed(KeyCode::KeyH) {
        *hide_ui = !*hide_ui;
    }

    if !*hide_ui {
        text.push_str("(H) Hide UI\n");
        text.push_str("(Space) Play/Pause\n\n");
        text.push_str("Rendering Method:\n");

        text.push_str(&format!(
            "(1) {} Deferred\n",
            if let DefaultRenderMode::Deferred = *mode {
                ">"
            } else {
                ""
            }
        ));
        text.push_str(&format!(
            "(2) {} Forward\n",
            if let DefaultRenderMode::Forward = *mode {
                ">"
            } else {
                ""
            }
        ));
        text.push_str(&format!(
            "(3) {} Forward + Prepass\n",
            if let DefaultRenderMode::ForwardPrepass = *mode {
                ">"
            } else {
                ""
            }
        ));
    }
}