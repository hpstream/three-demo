import * as THREE from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    scene.background = new THREE.Color(0x888888);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
  }
}