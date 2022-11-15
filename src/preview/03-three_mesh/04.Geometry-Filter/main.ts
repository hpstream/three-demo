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
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //红色
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const geometry = new THREE.BoxGeometry(1, 1, 1);



let doorColorTexture = new THREE.TextureLoader().load('/static/textures/door/color.jpg')

let texture = new THREE.TextureLoader().load('/static/textures/minecraft.png')

const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  // vertexColors: true,
  // map: doorColorTexture,
  map: texture
})
let gui = new dat.GUI();


// texture纹理显示设置
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;



let triangle = new THREE.Mesh(geometry, material)

var options = {
  minFilters: {
    NearestFilter: THREE.NearestFilter,
    NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
    NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
    'LinearFilter ': THREE.LinearFilter,
    'LinearMipMapLinearFilter (Default)': THREE.LinearMipMapLinearFilter,
    LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
  },
  magFilters: {
    NearestFilter: THREE.NearestFilter,
    'LinearFilter (Default)': THREE.LinearFilter,
  },
}
gui.add(texture, 'minFilter', options.minFilters).onChange(val => {
  let texture1 = new THREE.TextureLoader().load('/static/textures/minecraft.png')
  material.map = texture1
  if (material.map) {
    material.map.minFilter = Number(texture.minFilter)
    material.map.magFilter = Number(texture.magFilter)
  }
})
gui.add(texture, 'magFilter', options.magFilters).onChange(val => {
  let texture1 = new THREE.TextureLoader().load('/static/textures/minecraft.png')
  material.map = texture1

  if (material.map) {
    material.map.minFilter = Number(texture.minFilter)
    material.map.magFilter = Number(texture.magFilter)
  }
})
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
