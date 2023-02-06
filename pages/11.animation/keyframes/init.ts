import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

let width = window.innerWidth;
let height = window.innerHeight;
let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer;
export default class init {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  callback: (time: number) => void;
  stats: Stats;
  constructor() {
    // 场景
    this.scene = scene = initScene();
    // // 相机
    this.camera = camera = initCamera();
    this.renderer = renderer = initRender();

    this.stats = Stats();

    document.body.appendChild(this.stats.dom);





    this.initEventListener();

  }

  private initEventListener() {
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    })
  }

  render = (callback?: (time: number) => void) => {
    this.callback = callback;
    this.animate();
  }
  private animate = (time?: number) => {

    this.callback && this.callback(time);
    this.stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(this.animate);
  }

}

function initRender() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function initCamera() {
  let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  return camera
}


function initScene() {
  return new THREE.Scene();
}