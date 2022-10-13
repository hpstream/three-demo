import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

// scene
let scene = new THREE.Scene();

/**
 *  创建一个球体
 */
let sphereBufferGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
let standardMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000
})
let sphere = new THREE.Mesh(sphereBufferGeometry, standardMaterial)
sphere.castShadow = true;
scene.add(sphere);

// 增加光源
// 环境光
let ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight)




let params = {
  color: 0xff0000,
  lightColor: 0xffffff,
}
let gui = new dat.GUI();
let c = gui.addFolder('颜色设置')
c.open();
c.addColor(params, "color")
  .onChange(() => {
    console.log(params.color);
    sphere.material.color = new THREE.Color(params.color);
  }).name('物体颜色');
c.addColor(params, "lightColor")
  .onChange(() => {
    console.log(params.lightColor)
    ambientLight.color = new THREE.Color(params.lightColor);
  }).name('光的颜色');


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

