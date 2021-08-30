import {
  Scene,
  WebGL1Renderer,
  PerspectiveCamera,
  Color,
  AxesHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  SpotLight,
  MeshLambertMaterial,
} from "three";
// import * as THREE from "three";
// 学习目标：
// 1. 学习光照的使用
// 2. 学习反光材料

let renderer: WebGL1Renderer, scene: Scene, camera: PerspectiveCamera;

function paintGeometry() {
  // 绘画一个灰色，平面几何体
  const planeGeometry = new PlaneGeometry(60, 40);
  const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc });
  var plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true; // 接受光源
  scene.add(plane);
  var cubeGeometry = new BoxGeometry(4, 4, 4);
  var cubeMaterial = new MeshLambertMaterial({
    color: 0xff0000,
   //  wireframe: true,
  });
  var cube = new Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = 2;
  cube.position.y = 2;
  cube.position.z = 2;
  cube.castShadow = true; // 产生光源
  scene.add(cube);

  var shpereGeometry = new SphereGeometry(4, 20, 20);
  var shpereMeterial = new MeshLambertMaterial({
    color: 0x7777ff,
   //  wireframe: true,
  });
  var shpere = new Mesh(shpereGeometry, shpereMeterial);
  shpere.position.x = -10;
  shpere.position.y = 10;
  shpere.position.z = -10;
  shpere.castShadow = true; // 产生光源
  scene.add(shpere);
}
function paintLight() {
  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function init() {
  renderer = new WebGL1Renderer();
  scene = new Scene();
  camera = new PerspectiveCamera();
  // render the scene
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new Color(0xeeeeee));
  paintLight();
  paintGeometry();

  // position and point the camera to the center of the scene
  camera.position.x = -40; // 红线是X轴
  camera.position.y = 30; // 蓝线是y轴
  camera.position.z = 30; // 绿线是Z轴

  // show axes in the screen
  const axes = new AxesHelper(10);
  scene.add(axes);

  camera.lookAt(scene.position);
  renderer.render(scene, camera);

  // add the output of the renderer to the html element
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
}

window.onload = init;
