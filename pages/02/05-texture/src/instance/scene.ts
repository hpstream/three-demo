import * as THREE from "three";
import { Texture, _SRGBAFormat } from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x222222);
    // scene.fog = new THREE.Fog(0, 250, 1400);
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 250, 1400);
  }
}