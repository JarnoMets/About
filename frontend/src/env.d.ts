/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '/wasm-sphere/wasm_sphere.js' {
  /** Initialise the WASM module (must be called before any exports) */
  export default function init(): Promise<void>
  /** Returns interleaved [x,y,z,nx,ny,nz,...] float32 sphere vertices */
  export function sphere_vertices(stacks: number, slices: number): Float32Array
  /** Returns u32 index buffer */
  export function sphere_indices(stacks: number, slices: number): Uint32Array
}
