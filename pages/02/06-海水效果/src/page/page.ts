import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';
import * as THREE from "three";
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

let clock = new THREE.Clock();
export class Page {
  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;
  // orbitControls: OrbitControls;
  firstPersonControls: FirstPersonControls;
  // trackballControls: TrackballControls;

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
    scene.add(new THREE.AxesHelper(100))

    // 前进：w(鼠标左键)
    // 后台：s(鼠标右键)
    // 左移：a;
    // 右移：d;
    // 上移：r;
    // 下移：f:
    // 方向：鼠标
    this.firstPersonControls = new FirstPersonControls(camera, this.renderer.renderer.domElement);
    this.firstPersonControls.movementSpeed = 500;
    this.firstPersonControls.lookSpeed = 0.05;

  }

  render = () => {
    const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 10;

    const position = this.geometry.planeGeometry.attributes.position;

    for (let i = 0; i < position.count; i++) {

      const y = 35 * Math.sin(i / 5 + (time + i) / 7);
      position.setY(i, y);

    }
    this.firstPersonControls.update(delta);
    position.needsUpdate = true;
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

