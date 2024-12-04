use bevy::prelude::*;


pub fn plugin(app: &mut App) {
    #[cfg(not(target_arch = "wasm32"))]
    {
        use bevy_atmosphere::plugin::AtmospherePlugin;

        app.add_plugins(AtmospherePlugin);
    }
    app.add_plugins(insert_skybox);
}



#[cfg(not(target_arch = "wasm32"))]
fn insert_skybox(app: &mut App) {
    use bevy_atmosphere::plugin::AtmosphereCamera;
    use dimensify::camera::main_camera::MainCamera;

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

    /*
        creating a bevy compatible skybox from a panorama image and not an existing horizontal cross skybox image.

        1. Download a panorama image, such as https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/sunflowers_puresky.jpg
        2. Upload it to https://jaxry.github.io/panorama-to-cubemap/ and click on each of the generated tiles to download them, then put all of them in a folder
        3. Download the free ImageMagick cli tool and run this command from within the folder with the tiles you downloaded: "magick convert px.png nx.png py.png ny.png pz.png nz.png -gravity center -append cubemap.png"

        Now you have a vertically stacked cubemap that bevy's skybox component understands!
    */

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