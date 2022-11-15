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
let textrueLoader = new THREE.TextureLoader();
let doorColorTexture = textrueLoader.load('/static/textures/door/color.jpg')
let alphaTexture = textrueLoader.load('/static/textures/door/alpha.jpg')
let doorAoTexture = textrueLoader.load('/static/textures/door/ambientOcclusion.jpg')
let heightTexture = textrueLoader.load('/static/textures/door/height.jpg')
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
  displacementScale: 0.05
  // opacity: 0.3,

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

