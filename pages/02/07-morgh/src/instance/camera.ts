import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;

  constructor() {
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(45, config.aspect, 0.25, 100);
    camera.position.set(-5, 3, 20);
    camera.lookAt(0, 2, 0)

  }
}