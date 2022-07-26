import * as THREE from "three";

// Canvas

const canvas = document.querySelector("canvas.webgl");

// scene
let scene = new THREE.Scene();

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Object
 */
const group = new THREE.Group();
group.scale.set(1, 2, 1);
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
);
cube3.position.x = 1.5;
group.add(cube3);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k);
camera.position.z = 3;
// scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(width, height);
renderer.render(scene, camera);
