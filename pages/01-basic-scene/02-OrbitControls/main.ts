import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


// 目标：了解threejs的基本内容

// scene
let scene = new THREE.Scene();

/**
 * 几何体
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //红色
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000);
camera.position.z = 10;

// 为了方便观看物体移动了，添加坐标轴辅助器
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)


/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

// 如果不重新绘制，物体会禁止就会不动
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
render()



