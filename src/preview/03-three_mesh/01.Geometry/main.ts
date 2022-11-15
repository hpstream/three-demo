import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

// 目标：了解threejs的基本内容

// scene
let scene = new THREE.Scene();

/**
 * 几何体
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //红色
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 2,
]);

// const vertices = new Float32Array([
//   [0, 0, 0],
//   [1, 0, 0],
//   [0, 1, 0],

//   [0, 0, 1],
//   [1, 0, 1],
//   [0, 0, 2]
// ].flat())

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const colors = new Float32Array(
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],

    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ].flat()
);

geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  vertexColors: true,
});
console.log(geometry);
let triangle = new THREE.Mesh(geometry, material);

// const material = new THREE.PointsMaterial({
//   // color: '#ffffff',
//   // side: THREE.DoubleSide,
//   vertexColors: true,
//   size: 1

//   // transparent: true,
//   // opacity: 1,

// })
// const triangle = new THREE.Points(geometry, material)

scene.add(triangle);

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
renderer.setSize(width, height);
// camera.lookAt(0, 0, 0)
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
