
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
renderer.shadowMap.enabled = true;



initCube();
initCamera();
inigtAxes();
render();

// 环境光不产生投影
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)


let spotLight = new THREE.SpotLight(0xffffff, 1.0);
spotLight.castShadow = true;
spotLight.position.set(0, 10, 0);
spotLight.angle = Math.PI / 6
scene.add(spotLight);
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

  let mesh = new THREE.MeshLambertMaterial({
    color: 0xffffff
  })

  box = new THREE.Mesh(geometry, mesh)
  box.position.set(0, 0, 0)
  box.castShadow = true;
  scene.add(box)


  let plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshPhongMaterial({
    color: 0xffffff,
    // side: THREE.DoubleSide
  }))
  plane.receiveShadow = true;
  plane.rotateX(-Math.PI / 2);
  plane.position.set(0, -1, 0)


  scene.add(plane)
}
// 2.创建相机

function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  scene.add(camera)
}



