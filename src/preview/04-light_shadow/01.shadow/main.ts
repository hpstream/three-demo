import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// 目标：灯光与阴影
// 灯光阴影
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
// 3、设置光照投射阴影 directionalLight.castShadow = true;
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
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.castShadow = true;
directionalLight.position.set(5, 5, 5);
const helper = new THREE.DirectionalLightHelper(directionalLight, 1, 0x00ffffff);
scene.add(helper);

scene.add(directionalLight)



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

