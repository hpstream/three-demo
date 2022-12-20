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
let INTERSECTED;
const PARTICLE_SIZE = 20;
let raycaster = new THREE.Raycaster();
export class Page {
  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;
  orbitControls: OrbitControls;
  pointer: THREE.Vector2 = new THREE.Vector2(0, 0);
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









  }
  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(100))
    // let orbitControls = this.orbitControls = new OrbitControls(camera, this.renderer.renderer.domElement);
    // this.orbitControls.target.set(0, 10, 0)
    // orbitControls.enableZoom = false;
    // orbitControls.enablePan = false;
    // orbitControls.rotateSpeed = -0.25;
    // orbitControls.enableDamping = true;

  }

  render = () => {

    this.geometry.particles.rotation.x += 0.0005;
    this.geometry.particles.rotation.y += 0.001;
    const geometry = this.geometry.particles.geometry;
    const attributes = geometry.attributes;


    raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    let intersects = raycaster.intersectObject(this.geometry.particles);

    if (intersects.length > 0) {

      if (INTERSECTED != intersects[0].index) {

        // attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
        attributes.size.setX(INTERSECTED, PARTICLE_SIZE)

        INTERSECTED = intersects[0].index;

        // attributes.size.array[INTERSECTED] = PARTICLE_SIZE * 20;
        attributes.size.setX(INTERSECTED, PARTICLE_SIZE * 20)

        attributes.size.needsUpdate = true;

      }

    } else if (INTERSECTED !== null) {
      // console.log(INTERSECTED)

      // attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
      attributes.size.setX(INTERSECTED, PARTICLE_SIZE)
      attributes.size.needsUpdate = true;
      INTERSECTED = null;

    }

    // this.orbitControls.update();
    this.renderer.render();
    requestAnimationFrame(this.render)
  }


  initEvent() {
    let { perspectiveCamera } = this.camera;
    let { renderer } = this.renderer;
    window.addEventListener('resize', () => {

      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    document.addEventListener('pointermove', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    });



  }


}

