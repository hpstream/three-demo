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

// 物体移动
// mesh.position.x = 2;
// mesh.position.y = 2;
// mesh.position.z = 2;
// mesh.position.set(2, 2, 2)
// 物体缩放
// mesh.scale.x = 2;
// mesh.scale.y = 2;
// mesh.scale.z = 2;
mesh.scale.set(2, 2, 2)

// 物体旋转
// mesh.rotateX(Math.PI / 4)
// mesh.rotateY(Math.PI / 4)
// mesh.rotateZ(Math.PI / 4)
mesh.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4, 'XYZ');

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
scene.add(axesHelper)

/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// camera.lookAt(0, 0, 0)
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)
let star!: number;

// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {
  if (star) {
    mesh.position.x += 0.01;
  }
  star = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
window.requestAnimationFrame(render);



