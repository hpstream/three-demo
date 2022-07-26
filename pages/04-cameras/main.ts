import gsap from "gsap";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// Canvas

const canvas = document.querySelector("canvas.webgl");

// scene
let scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000}); //红色
const mesh = new THREE.Mesh(geometry, material);
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
  console.log(cursor);
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

/**
 * Animate
 */

gsap.to(mesh.position, {
  duration: 1,
  delay: 1,
  y: 2,
});
// console.log(mesh);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(width, height);
// Animate
const clock = new THREE.Clock();

const tick = () => {
  clock.getElapsedTime();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
