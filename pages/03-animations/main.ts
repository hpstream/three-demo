import gsap from "gsap";
import * as THREE from "three";

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

const tick = () => {
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
