
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
let i = 0;
let spotLightHelper: THREE.SpotLightHelper;
let spotLight: THREE.SpotLight;
renderer.shadowMap.enabled = true;
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
// 3、设置光照投射阴影 directionalLight.castShadow = true;
// 4、设置物体投射阴影 sphere.castShadow = true;
// 5、设置物体接收阴影 plane.receiveShadow = true;

initLight()
initCube();
initCamera();
inigtAxes();
render();

let gui = new GUI();

let s = gui.addFolder('控制');
s.open();
s.add(spotLight.position, 'x').min(-5).max(5).onChange(() => {
})
s.add(spotLight.position, 'z').min(-5).max(5).onChange(() => {
})
s.add(spotLight, 'angle').min(0).max(Math.PI / 2).onChange(() => {
})

s.add(spotLight, 'penumbra').min(-10).max(10).onChange(() => {
})
s.add(spotLight, 'intensity').min(-10).max(10).onChange(() => {
})
s.add(spotLight, 'distance').min(10).max(100).onChange(() => {
})

function initLight() {
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  spotLight = new THREE.SpotLight(0xffffff, 1.0);
  spotLight.shadow.mapSize.set(4096, 4096)
  spotLight.castShadow = true;
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 1;
  spotLight.position.set(0, 10, 0);
  // spotLight.lookAt(0, 0, 0);
  scene.add(spotLight);
  spotLightHelper = new THREE.SpotLightHelper(spotLight)

  scene.add(spotLightHelper);

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
  i += 0.01;
  box.rotateY(deg);
  // spotLight.position.set(5 + 5 * Math.sin(i), 10, 5 + 5 * Math.cos(i));
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
  scene.add(box);

  let plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshPhongMaterial({
    color: 0xffffff,
    // side: THREE.DoubleSide
  }))

  plane.rotateX(-Math.PI / 2);
  plane.position.set(0, -1, 0);
  plane.receiveShadow = true;

  scene.add(plane)
}
// 2.创建相机

function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  scene.add(camera)
}



