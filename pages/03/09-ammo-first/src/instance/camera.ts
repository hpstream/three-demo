import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;
  orthographicCamera: THREE.OrthographicCamera;

  constructor() {
    // let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(55, config.aspect, 1, 2000);
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(90, config.aspect, 1, 1000);
    camera.position.set(25, 25, 25);
    camera.lookAt(new THREE.Vector3(0, 6, 0))

  }
}