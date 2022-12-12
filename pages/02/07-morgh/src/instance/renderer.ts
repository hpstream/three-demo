
import config from '../config/config';
import * as THREE from "three";
export default class Renderer {
  renderer: THREE.WebGLRenderer;
  constructor(public scene: THREE.Scene, public camera: THREE.PerspectiveCamera) {

    let renderer = this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(config.width, config.height);
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;



    document.body.appendChild(renderer.domElement);
    // renderer.render(scene, camera);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}


