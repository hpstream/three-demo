import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;

  constructor() {
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(75, config.aspect, 0.1, 100);
    camera.position.set(0.2, 0, 0.2);
    camera.lookAt(0, 0, 0)

  }
}