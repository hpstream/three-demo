import * as THREE from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);
    // scene.fog = new THREE.Fog(0x000000, 0.01);
  }
}