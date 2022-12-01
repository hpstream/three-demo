import * as THREE from "three";

export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);


  }
}