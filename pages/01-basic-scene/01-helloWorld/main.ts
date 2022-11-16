
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let width = window.innerWidth;
let height = window.innerHeight;
let scene = new THREE.Scene();
let camera: THREE.PerspectiveCamera;
let deg = 0.01, box: THREE.Mesh;
let renderer = new THREE.WebGLRenderer({
  antialias: true
});



initCube();
initCamera();
inigtAxes();
render();

new OrbitControls(camera, renderer.domElement);
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);



// 添加辅助轴
function inigtAxes() {
  // r,g,b => red,green,blue;
  scene.add(new THREE.AxesHelper(10))
}


function render() {
  box.rotateY(deg);
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}

// 1. 创建物体
function initCube() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  let mesh = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })

  box = new THREE.Mesh(geometry, mesh)
  box.position.set(0, 0, 0)
  scene.add(box)
}
// 2.创建相机

function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  scene.add(camera)
}



