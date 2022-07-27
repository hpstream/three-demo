import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Canvas

const canvas = document.querySelector("canvas.webgl");

// scene
let scene = new THREE.Scene();

/**
 * Object
 */

var geometry1 = new THREE.BoxGeometry(1, 1, 1); //创建一个立方体几何对象Geometry
console.log(geometry1.getAttribute('position'));
geometry1.translate(10, 0, 0);

console.log(geometry1.getAttribute('position'));

const geometry = new THREE.BufferGeometry();
const count = 1;
const positionsArray = new Float32Array([
  0, 0, 0, //顶点1坐标
  1, 0, 0, //顶点2坐标
  0, 1, 0, //顶点3坐标

]);
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4;
// }
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

geometry.setAttribute("position", positionsAttribute);

geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 1, 0, //顶点2颜色
  0, 0, 1, //顶点3颜色
]), 3));
console.log(geometry)
const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000,
  vertexColors: true, //以顶点颜色为准
  side: THREE.DoubleSide //两面可见

  // wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
console.log(mesh)
scene.add(mesh);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k);
camera.position.z = 10;
// scene.add(camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / width - 0.5;
  cursor.y = -(event.clientY / height - 0.5);
  // console.log(cursor);
});
window.addEventListener("touchmove", (event) => {
  // console.log(event);
  cursor.x = event.changedTouches[0].clientX / width - 0.5;
  cursor.y = -(event.changedTouches[0].clientY / height - 0.5);
  // console.log(cursor);
});

// Controls
const controls = new OrbitControls(camera, canvas as HTMLElement);
// controls.target.y = 2
controls.enableDamping = true;

window.addEventListener("resize", () => {
  // Update sizes
  let width = window.innerWidth;
  let height = window.innerHeight;
  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  console.log("Update");
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Animate
const clock = new THREE.Clock();

const tick = () => {
  clock.getElapsedTime();
  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
