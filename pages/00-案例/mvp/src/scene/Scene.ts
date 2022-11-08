
// import { Camera, Light } from 'three';
import Light from "./Light";
import Camera from "./Camera";
import * as THREE from 'three';


export default class Scene {
  instance: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: Camera = new Camera();
  light: Light = new Light();
  constructor() {
    // this.instance = null
    // this.currentScore = null
  }
  init(canvas: HTMLCanvasElement) {
    this.instance = new THREE.Scene();
    const renderer = this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      precision: "highp",
      preserveDrawingBuffer: true
    })

    this.camera.init();
    this.light.init();

    this.instance.add(this.camera.instance)
    this.instance.add(this.light.shadowLight)
    this.instance.add(this.light.ambientLight)
    this.instance.add(this.light.shadowTarget)

    renderer.shadowMap.enabled = true;
    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);

  }

  render() {
    this.renderer.render(this.instance, this.camera.instance)
  }

}
