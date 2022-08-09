import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";
import { BufferAttribute } from "three";

// 目标：了解threejs的基本内容

// scene
let scene = new THREE.Scene();

/**
 * 几何体
 */

const geometry = new THREE.BoxGeometry(1, 1, 1, 200, 200);
let textureLoader = new THREE.TextureLoader();
let doorColorTexture = textureLoader.load('/static/textures/door/color.jpg')
let alphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
let doorAoTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
// 位移贴图
let heightTexture = textureLoader.load('/static/textures/door/height.jpg')

// 导入粗糙度贴图
const roughnessTexture = textureLoader.load("/static/textures/door/roughness.jpg");
// 导入金属贴图
const metalnessTexture = textureLoader.load("/static/textures/door/metalness.jpg");
// 导入法线贴图
const normalTexture = textureLoader.load("/static/textures/door/normal.jpg");

const material = new THREE.MeshStandardMaterial({
  // color: '#ff0000',
  side: THREE.DoubleSide,
  // vertexColors: true,
  map: doorColorTexture,
  alphaMap: alphaTexture,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  transparent: true,
  displacementMap: heightTexture,
  displacementScale: 0.05,
  roughnessMap: roughnessTexture,
  roughness: 1,
  metalnessMap: metalnessTexture,
  metalness: 1,
  normalMap: normalTexture
  // opacity: 0.3,

})

let gui = new dat.GUI();
let p = {
  displacementMap: true,
  roughnessMap: true,
  metalnessMap: true,
  normalMap: true,
}
gui.add(p, 'displacementMap').onChange(val => {
  if (val) {
    material.displacementMap = heightTexture
  } else {
    material.displacementMap = null
  }
})
gui.add(material, 'displacementScale', 0, 1, 0.01)


gui.add(p, 'roughnessMap').onChange(val => {
  if (val) {

    material.roughnessMap = roughnessTexture
  } else {
    material.roughnessMap = null
  }
})
gui.add(material, 'roughness', 0, 1, 0.01)

gui.add(p, 'metalnessMap').onChange(val => {
  if (val) {

    material.metalnessMap = metalnessTexture
  } else {
    material.metalnessMap = null
  }
})
gui.add(material, 'metalness', 0, 1, 0.01)

gui.add(p, 'normalMap').onChange(val => {
  if (val) {

    material.normalMap = normalTexture
  } else {
    material.normalMap = null
  }
})


geometry.setAttribute('uv2', new BufferAttribute(geometry.getAttribute('uv').array, 2))

let triangle = new THREE.Mesh(geometry, material)

scene.add(triangle)

// 添加平面
let planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200);
let plane = new THREE.Mesh(planeGeometry, material);

plane.position.set(1.5, 0, 0)

scene.add(plane)

// 增加光源
// 环境光
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)

// 平行光
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

directionalLight.position.set(10, 10, 10);
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

