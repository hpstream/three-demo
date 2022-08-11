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

// 创建球体

let sphereGeometry = new THREE.BufferGeometry();
let count = 5000;

// 设置缓冲区数组
let positions = new Float32Array(count * 3)
// 设置粒子顶点颜色
let colors = new Float32Array(count * 3)

for (let i = 0; i < positions.length; i++) {
  positions[i] = Math.random() * 100 - 50;
  colors[i] = Math.random();
}

sphereGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))



const pointsMaterial = new THREE.PointsMaterial({
  // color: '#ffc0cb',
  // size: 0.1
})
// // 相机深度而衰减
pointsMaterial.sizeAttenuation = true;
const mesh = new THREE.Points(sphereGeometry, pointsMaterial);

// 载入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/static/textures/particles/zs2.png");
// 设置点材质纹理
pointsMaterial.map = texture;
pointsMaterial.alphaMap = texture;
pointsMaterial.transparent = true;
pointsMaterial.depthWrite = false;

pointsMaterial.blending = THREE.AdditiveBlending;


scene.add(mesh);

let gui = new dat.GUI()

gui.add(pointsMaterial, 'sizeAttenuation')
gui.add(pointsMaterial, 'depthWrite')
gui.add(pointsMaterial, 'transparent')
console.log(THREE.AdditiveBlending)
gui.add(pointsMaterial, 'blending', ['NoBlending', 'NormalBlending', 'AdditiveBlending', 'SubtractiveBlending', 'MultiplyBlending', 'CustomBlending']).onChange(val => {
  pointsMaterial.blending = THREE[val];

})



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


const controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(document.body)

// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
