import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

// 目标：了解threejs的基本内容

// scene
let scene = new THREE.Scene();
// 参数
const params = {
  count: 1000,
  size: 0.1,
  radius: 5,
  branch: 3,
  color: "#ff6030",
  rotateScale: 0.3,
  endColor: "#1b3984",
  rate: 10,
};


const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("/static/textures/particles/1.png");
let sphereGeometry = new THREE.BufferGeometry();
const pointsMaterial = new THREE.PointsMaterial({
  size: params.size,
  sizeAttenuation: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  map: particlesTexture,
  alphaMap: particlesTexture,
  transparent: true,
  vertexColors: true,

})
pointsMaterial.transparent = true;
pointsMaterial.depthWrite = false;
// 相机深度而衰减
pointsMaterial.sizeAttenuation = true;
const mesh = new THREE.Points(sphereGeometry, pointsMaterial);

pointsMaterial.blending = THREE.AdditiveBlending;
scene.add(mesh);

let gui = new dat.GUI();

gui.add(params, 'rotateScale').min(0).max(1).onChange(() => {
  generateGalaxy()
})
gui.add(params, 'count').min(0).max(10000).onChange(() => {
  generateGalaxy()
})

gui.addColor(params, 'color').onChange(() => {
  generateGalaxy()
})

gui.addColor(params, 'endColor').onChange(() => {
  generateGalaxy()
})
gui.add(params, 'rate').min(0).max(20).onChange(() => {
  // generateGalaxy()
})


/**
 * 几何体
 */
function generateGalaxy() {
  let startColor = new THREE.Color(params.color);
  const endColor = new THREE.Color(params.endColor);
  // 设置缓冲区数组
  let positions = new Float32Array(params.count * 3)
  // 设置粒子顶点颜色
  let colors = new Float32Array(params.count * 3)

  for (let i = 0; i < params.count; i++) {
    const current = i * 3;
    let angelBranch = i % params.branch / params.branch * 2 * Math.PI;
    let random = Math.random()
    let distance = params.radius * Math.pow(random, 3);

    const randomX =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;

    // const randomX =
    //   (Math.pow(Math.random() * 2 - 1, 3) * (distance));
    // const randomY =
    //   (Math.pow(Math.random() * 2 - 1, 3) * (distance));
    // const randomZ =
    //   (Math.pow(Math.random() * 2 - 1, 3) * (distance));

    positions[current] = Math.sin(angelBranch + distance * params.rotateScale) * distance + randomX;
    positions[current + 1] = 0 + randomY;
    positions[current + 2] = Math.cos(angelBranch + distance * params.rotateScale) * distance + randomZ;


    // 混合颜色，形成渐变色
    const mixColor = startColor.clone();
    mixColor.lerp(endColor, distance / params.radius);

    colors[current] = mixColor.r;
    colors[current + 1] = mixColor.g;
    colors[current + 2] = mixColor.b;
  }

  sphereGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

}

generateGalaxy();





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

let clock = new THREE.Clock();
// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {

  let t = clock.getElapsedTime() % params.rate / params.rate;
  mesh.rotation.set(0, t * Math.PI * 2, 0)
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

