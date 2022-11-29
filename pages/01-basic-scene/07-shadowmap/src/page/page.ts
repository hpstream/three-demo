import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';


let clock = new THREE.Clock();
export class Page {
  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;
  stats: Stats;
  dirLightShadowMapViemer: ShadowMapViewer;
  spotLightShadowMapViemer: ShadowMapViewer;

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


    // 添加灯光
    this.light = new Light(scene);
    this.light.init();

    this.createHelpUtils();

    // 添加物体
    let box = this.geometry = new Geometry(scene);

  }
  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(10))
    let controls = new OrbitControls(camera, this.renderer.renderer.domElement);
    controls.target.set(0, 1, 0);


    let stats = this.stats = Stats();
    document.body.appendChild(stats.dom);
    // mapviewer
    this.dirLightShadowMapViemer = new ShadowMapViewer(this.light.dirLight)
    this.spotLightShadowMapViemer = new ShadowMapViewer(this.light.spotLight)

    this.resizeShadowMapViemer();

  }
  resizeShadowMapViemer() {
    let dirLightShadowMapViemer = this.dirLightShadowMapViemer;
    let spotLightShadowMapViemer = this.spotLightShadowMapViemer;
    const size = window.innerWidth * 0.15;
    dirLightShadowMapViemer.position.x = 50;
    dirLightShadowMapViemer.position.y = 50;
    dirLightShadowMapViemer.size.width = size;
    dirLightShadowMapViemer.size.height = size;
    dirLightShadowMapViemer.update();


    spotLightShadowMapViemer.size.set(size, size);
    spotLightShadowMapViemer.position.set(size + 50, 50)

  }

  render = () => {

    this.amimate();
    requestAnimationFrame(this.render);

  }
  amimate = () => {
    this.renderer.render();
    this.stats.update();
    const delta = clock.getDelta(); // 获取自 .oldTime 设置后到当前的秒数
    this.geometry.torusKnot.rotation.x += 0.25 * delta;
    this.geometry.torusKnot.rotation.y += 2 * delta;
    this.geometry.torusKnot.rotation.z += 1 * delta;

    this.geometry.cube.rotation.x += 0.25 * delta;
    this.geometry.cube.rotation.y += 2 * delta;
    this.geometry.cube.rotation.z += 1 * delta;
    this.dirLightShadowMapViemer.render(this.renderer.renderer);
    this.spotLightShadowMapViemer.render(this.renderer.renderer);
  }



  initEvent() {
    let { perspectiveCamera } = this.camera;
    let { renderer } = this.renderer;
    window.addEventListener('resize', () => {
      perspectiveCamera.aspect = config.aspect;

      perspectiveCamera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      this.resizeShadowMapViemer();
      this.dirLightShadowMapViemer.updateForWindowResize();
      this.spotLightShadowMapViemer.updateForWindowResize();
    })


  }


}

