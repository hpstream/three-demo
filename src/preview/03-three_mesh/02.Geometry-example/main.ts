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

for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    vertices[j] = Math.random() * 10 - 5;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

  let color = new THREE.Color(Math.random(), Math.random(), Math.random())

  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  })
  let mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

}



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
