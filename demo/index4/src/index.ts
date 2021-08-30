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
import Stats from "stats.js";

// import * as THREE from "three";
// 学习目标：
// 1. 物体运动
// 2. 查看物体运动的的性能

let renderer: WebGL1Renderer,
  scene: Scene,
  camera: PerspectiveCamera,
  stats: Stats;

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

  var sphereGeometry = new SphereGeometry(4, 20, 20);
  var sphereMeterial = new MeshLambertMaterial({
    color: 0x7777ff,
    //  wireframe: true,
  });
  var sphere = new Mesh(sphereGeometry, sphereMeterial);
  sphere.position.x = -10;
  sphere.position.y = 10;
  sphere.position.z = -10;
  sphere.castShadow = true; // 产生光源
  scene.add(sphere);

  renderScene();

  var step = 0;

  function renderScene() {
    stats.update();
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    // bounce the sphere up and down
    step += 0.04;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // render using requestAnimationFrame
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
}

function initStats() {
   stats = new Stats();

  stats.showPanel(2); // 0: fps, 1: ms

  // Align top-left
  stats.dom.style.position = "absolute";
  stats.dom.style.left = "0px";
  stats.dom.style.top = "0px";

  document.getElementById("Stats-output").appendChild(stats.dom);

  return stats;
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
  initStats();
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
  // renderer.render(scene, camera);

  // add the output of the renderer to the html element
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
}

window.onload = init;
