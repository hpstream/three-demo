import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;

  constructor() {
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(55, config.aspect, 2, 2000);
    camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0)

  }
}