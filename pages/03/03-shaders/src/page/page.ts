import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Clock } from 'three';
let clock = new Clock();
export class Page {
  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;
  orbitControls: OrbitControls;
  mouseY: number = 0;
  mouseX: number = 0;

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



    let pmremGenerator = new THREE.PMREMGenerator(this.renderer.renderer);
    // console.log(this.geometry.sky)
    let renderTarget = pmremGenerator.fromScene(this.scene.scene);

    this.scene.scene.environment = renderTarget.texture;






  }
  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(100))
    let orbitControls = this.orbitControls = new OrbitControls(camera, this.renderer.renderer.domElement);
    this.orbitControls.target.set(0, 10, 0)
    // orbitControls.enableZoom = false;
    // orbitControls.enablePan = false;
    // orbitControls.rotateSpeed = -0.25;
    // orbitControls.enableDamping = true;

  }

  render = () => {

    let elapsedTime = clock.getElapsedTime();

    this.geometry.cube.position.y = Math.sin(elapsedTime) * 20 + 5;
    this.geometry.cube.rotation.x = elapsedTime * 0.5;
    this.geometry.cube.rotation.z = elapsedTime * 0.5;
    this.geometry.water.material.uniforms['time'].value += 1 / 120;

    this.orbitControls.update();
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

    document.body.addEventListener('pointermove', (e) => {
      this.mouseX = e.clientX - window.innerWidth / 2;
      this.mouseY = e.clientY - window.innerHeight / 2
    })


  }


}

