/// <reference types="vite/client" />

// declare module "three" {
//   // export interface OrbitControls {}
//   export * as THREE from "three";
// }

declare namespace THREE {
  export class OrbitControls {
    constructor(c: THREE.Camera, d: HTMLCanvasElement);
  }
}
