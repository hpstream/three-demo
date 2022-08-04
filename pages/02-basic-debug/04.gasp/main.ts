import gsap from "gsap";
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


let animate = gsap.to(mesh.position, { x: 5, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" })

window.addEventListener('dblclick', () => {
  if (animate.isActive()) {
    animate.pause()
  } else {
    animate.play()
  }
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  console.log('resize')

  renderer.render(scene, camera);
  renderer.setPixelRatio(window.devicePixelRatio)
})

// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {

  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
window.requestAnimationFrame(render);



