import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { CameraHelper, SpotLightHelper } from "three";

// 目标：灯光与阴影
// 灯光阴影
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
// 3、设置光照投射阴影 spotLight.castShadow = true;
// 4、设置物体投射阴影 sphere.castShadow = true;
// 5、设置物体接收阴影 plane.receiveShadow = true;

// scene
let scene = new THREE.Scene();

/**
 *  创建一个球体
 */
let sphereBufferGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
let standardMaterial = new THREE.MeshStandardMaterial()
let sphere = new THREE.Mesh(sphereBufferGeometry, standardMaterial)
sphere.castShadow = true;
scene.add(sphere);


// 创建一个平面

let planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, standardMaterial)
plane.material.side = THREE.DoubleSide;
plane.position.set(0, -1, 0)
plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true;

scene.add(plane)



// 增加光源
// 环境光
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)

// 平行光
let spotLight = new THREE.SpotLight(0xffffff, 0.5);

spotLight.castShadow = true;
spotLight.position.set(5, 5, 5);

// 设置阴影贴图模糊度
spotLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
// spotLight.shadow.mapSize.set(4096, 4096);
// console.log(spotLight.shadow);

// 设置平行光投射相机的属性
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 500;

spotLight.target = sphere;
spotLight.angle = Math.PI / 6;
spotLight.distance = 0;
spotLight.penumbra = 0;
spotLight.decay = 0;


let c = new CameraHelper(spotLight.shadow.camera);

let gui = new dat.GUI();

let p = {
  near: 0.5,
  far: 500,
  fov: 50
}
gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
gui
  .add(spotLight, "angle")
  .min(0)
  .max(Math.PI / 2)
  .step(0.01);
gui.add(spotLight, "distance").min(0).max(10).step(0.01);
gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
gui.add(spotLight, "decay").min(0).max(5).step(0.01);

gui
  .add(spotLight.shadow, "radius")
  .min(0)
  .max(2000)
  .step(1)
  .onChange(() => {
    spotLight.shadow.camera.fov = p.fov;
    spotLight.shadow.camera.far = p.far;
    spotLight.shadow.camera.near = p.near;
    spotLight.shadow.camera.updateProjectionMatrix();
    c.update()
  });
gui
  .add(p, "near")
  .min(0)
  .max(10)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.fov = p.fov;
    spotLight.shadow.camera.far = p.far;
    spotLight.shadow.camera.near = p.near;
    spotLight.shadow.camera.updateProjectionMatrix();

    c.update()
  });
gui
  .add(p, "far")
  .min(0)
  .max(100)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.fov = p.fov;
    spotLight.shadow.camera.far = p.far;
    spotLight.shadow.camera.near = p.near;
    spotLight.shadow.camera.updateProjectionMatrix();

    c.update()
  });

gui
  .add(p, "fov")
  .min(0)
  .max(90)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.fov = p.fov;
    spotLight.shadow.camera.far = p.far;
    spotLight.shadow.camera.near = p.near;
    spotLight.shadow.camera.updateProjectionMatrix();

    c.update()
  });






scene.add(c)

const helper = new THREE.SpotLightHelper(spotLight, 1);
scene.add(helper);

scene.add(spotLight)



/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 10;
camera.position.x = 10;

let axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);

// camera.lookAt(0, 0, 0)
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(document.body)




// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {
  renderer.render(scene, camera);
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
