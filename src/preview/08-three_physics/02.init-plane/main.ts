
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

// 导入connon引擎
import * as CANNON from "cannon-es";

// 目标：了解threejs的基本内容
// scene
let scene = new THREE.Scene();

// 创建球和平面
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.position.set(0, 5, 0)
scene.add(sphere);

const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial()
);

floor.position.set(0, 0, 0);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

//添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(-5, 8, -5)
dirLight.castShadow = true;
scene.add(dirLight);


// 创建一个物理世界

let world = new CANNON.World();
// 设置重力
world.gravity = new CANNON.Vec3(0, -9.8, 0)

// 创建一个物理小球
let cSphere = new CANNON.Sphere(1);

let cSphereMaterial = new CANNON.Material();


let cSpherebody = new CANNON.Body({
  shape: cSphere,
  material: cSphereMaterial,
  mass: 1,// 质量
  position: new CANNON.Vec3(sphere.position.x, sphere.position.y, sphere.position.z)// 位置
})
// 将物体添加至物理世界
world.addBody(cSpherebody);


// 创建地面
let floorShape = new CANNON.Plane();
// 创建材质
let floorMaterial = new CANNON.Material({});

let floorBody = new CANNON.Body({
  shape: floorShape,
  material: floorMaterial,
  mass: 0,
  position: new CANNON.Vec3(floor.position.x, floor.position.y, floor.position.z)
})
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody)

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 15;
camera.position.x = 15;

let axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
camera.lookAt(0, 0, 0)
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(document.body)
let clock = new THREE.Clock();
// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {
  renderer.render(scene, camera);
  world.step(1 / 120, clock.getDelta())
  sphere.position.copy(new THREE.Vector3(cSpherebody.position.x, cSpherebody.position.y, cSpherebody.position.z));
  requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});


