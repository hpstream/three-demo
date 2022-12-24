import config from '../config/config'
import * as THREE from "three";
export class Camera {
  perspectiveCamera: THREE.PerspectiveCamera;
  orthographicCamera: THREE.OrthographicCamera;

  constructor() {
    // let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(55, config.aspect, 1, 2000);
    let camera = this.perspectiveCamera = new THREE.PerspectiveCamera(60, config.aspect, 0.2, 2000);
    camera.position.set(-14, 8, 16);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

  }
}