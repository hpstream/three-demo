import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';
import * as THREE from "three";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
export class Page {
  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;
  trackballControls: TrackballControls;

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
    this.trackballControls = new TrackballControls(camera, this.renderer.renderer.domElement);
  }

  render = () => {

    this.trackballControls && this.trackballControls.update();

    this.geometry.css2DRenderer && this.geometry.css2DRenderer.render(this.scene.scene, this.camera.perspectiveCamera);
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

    // window.addEventListener('mousemove', (event) => {
    //   event.preventDefault();
    //   //从左到右 -1，1；
    //   //从下到上是-1，1

    //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // })
  }


}

