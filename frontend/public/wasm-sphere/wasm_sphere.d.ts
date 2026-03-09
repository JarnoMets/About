/* tslint:disable */
/* eslint-disable */
/**
 * Generate torus index buffer (u32 indices)
 * @param {number} radial_segments
 * @param {number} tubular_segments
 * @returns {Uint32Array}
 */
export function torus_indices(radial_segments: number, tubular_segments: number): Uint32Array;
/**
 * Generate torus geometry and return interleaved f32 data:
 * [x, y, z, nx, ny, nz,  x, y, z, nx, ny, nz, ...]
 * @param {number} radial_segments
 * @param {number} tubular_segments
 * @param {number} radius
 * @param {number} tube
 * @returns {Float32Array}
 */
export function torus_vertices(radial_segments: number, tubular_segments: number, radius: number, tube: number): Float32Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly torus_indices: (a: number, b: number) => Array;
  readonly torus_vertices: (a: number, b: number, c: number, d: number) => Array;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
