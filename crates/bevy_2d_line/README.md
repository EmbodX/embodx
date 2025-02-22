Fork at 9224aca021dd03cdd5561290465cd8397751786a

# bevy 2d line
![image](https://github.com/user-attachments/assets/3873c448-8db4-459f-8235-1b6e5878a727)

Bevy port of https://github.com/mattdesl/three-line-2d

Polylines in a vertex shader; plays nice with projection scale, z-index; supports vertex colors. Does not support picking!

Moving thousands of line endpoints every frame will be slow, because the mesh needs rebuilt when the lines are moved.


Lazily maintained at best!

## Compatibility

| Bevy Version | bevy_2d_line Version |
|--------------|----------------------|
| 0.14         | 0.1.2                |

## Installation

Add the following to your `Cargo.toml`:

```toml
[dependencies]
bevy_2d_line = "0.1.2"
```

## Usage

1. Add the `LineRenderingPlugin` to your Bevy app:

```rust
use bevy::prelude::*;
use bevy_2d_line::LineRenderingPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(LineRenderingPlugin)
        .add_systems(Startup, setup)
        .run();
}
```

2. Create and spawn a `Line` component:

```rust
use bevy_2d_line::Line;
use bevy::{color::palettes::css::{BLUE, GREEN, RED}, prelude::*};

fn setup(mut commands: Commands) {
    commands.spawn(Camera2dBundle::default());

    let points = vec![
        Vec2::new(-200.0, 0.0),
        Vec2::new(0.0, 200.0),
        Vec2::new(200.0, 0.0),
    ];

    let colors = vec![
        RED.into(),
        GREEN.into(),
        BLUE.into(),
    ];

    commands.spawn(Line {
        points,
        colors,
        thickness: 5.0,
    });
}
```

## Examples

Check out the `examples` directory for more detailed usage:

- `simple_line.rs`: Basic usage of the line renderer
- `curved_line.rs`: Rendering a curved line using Bezier curves

To run an example:

```
cargo run --example simple_line
```

## License

 * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
