import gsap from "gsap";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 目标：了解threejs的基本内容


// 目标：设置环境纹理
// 加载hdr环境图
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("/static/textures/hdr/003.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// scene
let scene = new THREE.Scene();

/**
 * 几何体
 */

let cubeTextureLoader = new THREE.CubeTextureLoader();

let envMap = cubeTextureLoader.load([
  "/static/textures/environmentMaps/1/px.jpg",
  "/static/textures/environmentMaps/1/nx.jpg",
  "/static/textures/environmentMaps/1/py.jpg",
  "/static/textures/environmentMaps/1/ny.jpg",
  "/static/textures/environmentMaps/1/pz.jpg",
  "/static/textures/environmentMaps/1/nz.jpg",
])
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0,
  // envMap
})
let gui = new dat.GUI();
gui.add(material, 'metalness', 0, 1, 0.1)
gui.add(material, 'roughness', 0, 1, 0.1)

scene.background = envMap;

scene.environment = envMap;

let triangle = new THREE.Mesh(sphereGeometry, material)

scene.add(triangle)



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

