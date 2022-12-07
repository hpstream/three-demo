import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;

  constructor() {
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(45, config.aspect, 1, 20000);
    camera.position.set(0, 100, 300);
    camera.lookAt(0, 0, 0)

  }
}