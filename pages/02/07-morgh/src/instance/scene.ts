import * as THREE from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
  }
}