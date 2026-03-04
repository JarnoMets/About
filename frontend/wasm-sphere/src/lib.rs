use wasm_bindgen::prelude::*;

/// Generate torus geometry and return interleaved f32 data:
/// [x, y, z, nx, ny, nz,  x, y, z, nx, ny, nz, ...]
#[wasm_bindgen]
pub fn torus_vertices(radial_segments: u32, tubular_segments: u32, radius: f32, tube: f32) -> Vec<f32> {
    console_error_panic_hook::set_once();
    let mut verts = Vec::new();

    for i in 0..=radial_segments {
        let u = i as f32 / radial_segments as f32 * 2.0 * std::f32::consts::PI;
        for j in 0..=tubular_segments {
            let v = j as f32 / tubular_segments as f32 * 2.0 * std::f32::consts::PI;

            let x = (radius + tube * v.cos()) * u.cos();
            let y = (radius + tube * v.cos()) * u.sin();
            let z = tube * v.sin();

            // Position
            verts.push(x);
            verts.push(y);
            verts.push(z);

            // Normal
            let nx = v.cos() * u.cos();
            let ny = v.cos() * u.sin();
            let nz = v.sin();
            verts.push(nx);
            verts.push(ny);
            verts.push(nz);
        }
    }

    verts
}

/// Generate torus index buffer (u32 indices)
#[wasm_bindgen]
pub fn torus_indices(radial_segments: u32, tubular_segments: u32) -> Vec<u32> {
    let mut idx = Vec::new();

    for i in 0..radial_segments {
        for j in 0..tubular_segments {
            let a = i * (tubular_segments + 1) + j;
            let b = i * (tubular_segments + 1) + j + 1;
            let c = (i + 1) * (tubular_segments + 1) + j;
            let d = (i + 1) * (tubular_segments + 1) + j + 1;
            idx.extend_from_slice(&[a, c, b, b, c, d]);
        }
    }

    idx
}
