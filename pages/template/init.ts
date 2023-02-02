import * as THREE from "three";


let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer;
export default class init {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  light: Record<string, THREE.Light>
  renderer: THREE.WebGLRenderer;
  callback: (time: number) => void;
  constructor() {
    // 场景
    this.scene = scene = initScene();
    // 相机
    this.camera = camera = initCamera();
    this.light = initLight()
    this.renderer = initRender();
    this.initEventListener();
  }

  private initEventListener() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render = (callback?: (time: number) => void) => {
    this.callback = callback;
    this.animate();
  }
  private animate = (time?: number) => {
    this.callback && this.callback(time);
    renderer.render(scene, camera);
    requestAnimationFrame(this.animate);
  }

}

function initRender() {
  let renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function initLight() {
  const directionalLight = new THREE.DirectionalLight(0xffeedd);
  // directionalLight.position.set(0, 0, 2);
  scene.add(directionalLight);
  return {
    directionalLight
  };
}

function initCamera() {
  return new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
}


function initScene() {
  return new THREE.Scene();
}