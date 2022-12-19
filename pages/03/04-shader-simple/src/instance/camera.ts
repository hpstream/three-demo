import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;
  orthographicCamera: THREE.OrthographicCamera;

  constructor() {
    // let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(55, config.aspect, 1, 2000);
    let camera = this.orthographicCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0, 100);
    camera.position.set(0, 0, 10);
    // camera.lookAt(0, 0, 0)

  }
}