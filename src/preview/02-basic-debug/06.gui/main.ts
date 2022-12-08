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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //红色
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

console.log(geometry)

let gui = new dat.GUI();
let g = gui.addFolder("立方体");
g.close();
g.open();
// 数字操作，字符串，布尔值，函数
g.add(mesh.position, "x")
  .min(0)
  .max(5)
  .step(0.1)
  .name("移动x")
  .onChange((value) => {
    console.log("值被修改：", value);
  })
  .onFinishChange((value) => {
    console.log("完全停下来:", value);
  });
let params = {
  color: '#000000',
  fn: () => {
    let animate = gsap.to(mesh.position, { x: 5, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" })

  }
}
// 修改颜色,字符串操作
g.addColor(params, 'color').onChange((value: string) => {
  mesh.material.color.set(value)
})
// 布尔值
g.add(mesh, 'visible').name('是否显示')
// 执行函数
g.add(params, 'fn').name('开始动画')




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



window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    //   双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    //   退出全屏，使用document对象
    document.exitFullscreen();
  }
  //   console.log(fullScreenElement);
});

// 如果不重新绘制，物体会禁止就会不动
function render(time: number) {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
