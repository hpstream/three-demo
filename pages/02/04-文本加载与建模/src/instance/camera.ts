import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;

  constructor() {
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(45, config.aspect, 1, 1500);
    camera.position.set(0, 250, 700);
    camera.lookAt(0, 0, 0)

  }
}