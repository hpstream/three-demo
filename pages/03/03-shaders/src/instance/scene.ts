import * as THREE from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x888888);
    scene.fog = new THREE.Fog(0x000000, 0.01);
  }
}