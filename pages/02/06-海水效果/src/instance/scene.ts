import * as THREE from "three";
import { Texture, _SRGBAFormat } from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaccff);
    scene.fog = new THREE.FogExp2(0xaaccff, 0.0007);
  }
}