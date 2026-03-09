import { reactive } from 'vue';

// Shared rotation state to keep the 2D Home dots and the WebGPU and and torus sync'd
// during route transitions.

type Quat = [number, number, number, number];

export const sharedRotation = reactive({
  autoSpinT: Math.random() * 100, // randomized start so it doesn't always start the same
  cursorQuat: [0, 0, 0, 1] as Quat,
  lastMoveMs: -Infinity,
});
