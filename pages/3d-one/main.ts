import * as THREE from "three";

// 1. 创建一个场景
let scene = new THREE.Scene();

// 2.创建一个几何体，或者说创建网格模型
let boxGeometry = new THREE.BoxGeometry(100, 100, 100);
// 3. 创建材质
// THREE.MeshBasicMaterial
let material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  wireframe: true,
});

// 4. 创建具体物体， 网格模型对象Mesh
let boxMesh = new THREE.Mesh(boxGeometry, material);

// 5. 将物体添加到场景中
scene.add(boxMesh);

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
renderer.render(scene, camera);
