
import { GUI } from "dat.gui";
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
let spotLight: THREE.SpotLight,
  spotLightHelper: THREE.SpotLightHelper;




initLight();
initCube();

initCamera();
inigtAxes();
render();
let gui = new GUI();
let s = gui.addFolder('控制');
s.open();
// intensity ?: number,
//   distance ?: number,
//   angle ?: number,
//   penumbra ?: number,
//   decay ?: number,
s.add(spotLight.position, 'x').min(-5).max(5).onChange(() => { });
s.add(spotLight.position, 'z').min(-5).max(5).onChange(() => { });
s.add(spotLight, 'intensity').min(-5).max(5).onChange(() => { });
s.add(spotLight, 'distance').min(0).max(50).onChange(() => { });
s.add(spotLight, 'angle').min(0).max(Math.PI / 2).onChange(() => { });
s.add(spotLight, 'penumbra').min(-5).max(5).step(0.1).onChange(() => { });
s.add(spotLight, 'decay').min(-5).max(5).onChange(() => { });

// 环境光不产生投影
function initLight() {
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight)

  spotLight = new THREE.SpotLight(0xffffff, 1.0);
  spotLight.castShadow = true;
  spotLight.position.set(0, 10, 0);
  spotLight.angle = Math.PI / 6
  scene.add(spotLight);

  spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper)
}
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

  spotLightHelper.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render)
}

// 1. 创建物体
function initCube() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  let mesh = new THREE.MeshPhongMaterial({
    color: 0x00ff00
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



