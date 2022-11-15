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

let cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
let cubeArr = [];
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    for (let z = -5; z < 5; z++) {
      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(i, j, z);
      scene.add(cube);
      cubeArr.push(cube);
    }
  }
}

// const mesh = new THREE.Mesh(cubeGeometry, material);
// scene.add(mesh)


// 创建投射光线对象
const raycaster = new THREE.Raycaster();

// 鼠标的位置对象
const mouse = new THREE.Vector2();

// 监听鼠标的位置
window.addEventListener("click", (event) => {
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  //   console.log(event);
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(mouse, camera);

  let result = raycaster.intersectObjects(cubeArr);
  //   console.log(result);
  //   result[0].object.material = redMaterial;
  result.forEach((item) => {
    (item.object as THREE.Mesh).material = redMaterial;

  });
});


/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 15;
camera.position.x = 15;

let axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
camera.lookAt(0, 0, 0)
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


