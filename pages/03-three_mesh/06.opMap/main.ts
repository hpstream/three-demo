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
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //红色
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const geometry = new THREE.BoxGeometry(2, 2, 2);



let doorColorTexture = new THREE.TextureLoader().load('/static/textures/door/color.jpg')
let alphaTexture = new THREE.TextureLoader().load('/static/textures/door/alpha.jpg')
let doorAoTexture = new THREE.TextureLoader().load('/static/textures/door/ambientOcclusion.jpg')



const material = new THREE.MeshBasicMaterial({
  // color: '#ff0000',
  side: THREE.DoubleSide,
  // vertexColors: true,
  map: doorColorTexture,
  alphaMap: undefined,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  transparent: true,
  // opacity: 0.3,

})
let gui = new dat.GUI();
let p = {
  flag: false,
  opFlag: true
}
gui.add(material, 'transparent')
gui.add(material, 'opacity', 0, 1, 0.1)
gui.add(material, 'aoMapIntensity', 0, 1, 0.1)
gui.add(p, 'flag').name('alphaMap').onChange(val => {
  if (val) {
    material.alphaMap = alphaTexture
  } else {
    material.alphaMap = null
  }
})
gui.add(p, 'opFlag').name('aoMap').onChange(val => {
  if (val) {
    material.aoMap = doorAoTexture
  } else {
    material.aoMap = null
  }
})
console.log(geometry.getAttribute('uv'))
geometry.setAttribute('uv2', new BufferAttribute(geometry.getAttribute('uv').array, 2))

let triangle = new THREE.Mesh(geometry, material)



scene.add(triangle)


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
