import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
let clock = new THREE.Clock();
export class Page {
  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;

  constructor() {
    this.init()
    this.initEvent();
  }
  init() {

    this.camera = new Camera();
    this.scene = new Scene();
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;

    this.renderer = new renderer(scene, camera);
    this.createHelpUtils();

    // 添加灯光
    this.light = new Light(scene);
    this.light.init();



    // 添加物体
    let box = this.geometry = new Geometry(scene);

  }
  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(10))
    new OrbitControls(camera, this.renderer.renderer.domElement);
  }

  render = () => {
    const delta = clock.getDelta();
    this.geometry.mixer && this.geometry.mixer.update(delta)
    this.renderer.render();
    requestAnimationFrame(this.render)
  }


  initEvent() {
    let { perspectiveCamera } = this.camera;
    let { renderer } = this.renderer;
    window.addEventListener('resize', () => {
      perspectiveCamera.aspect = config.aspect;

      perspectiveCamera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

  }


}

