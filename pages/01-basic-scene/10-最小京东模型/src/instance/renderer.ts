
import config from '../config/config';
import * as THREE from "three";
export default class Renderer {
  renderer: THREE.WebGLRenderer;
  constructor(public scene: THREE.Scene, public camera: THREE.PerspectiveCamera) {

    let renderer = this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    // 设置原因：https://juejin.cn/post/7109648309509160973
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.setSize(config.width, config.height);

    document.body.appendChild(renderer.domElement);
    // renderer.render(scene, camera);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}


