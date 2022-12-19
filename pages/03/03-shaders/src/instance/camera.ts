import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;

  constructor() {
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(55, config.aspect, 1, 2000);
    camera.position.set(30, 30, 100);
    camera.lookAt(0, 0, 0)

  }
}