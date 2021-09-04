import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  AxesHelper,
  PlaneGeometry,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  SpotLight,
  MeshLambertMaterial,
  AmbientLight,
} from "three";
import Stats from "stats.js";
import * as dat from "dat.gui";
import * as THREE from "three";
// 学习目标：
// 1. 学习场景常用的api，并总结
// 2. 实现一个常用的案例

let renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  stats: Stats,
  spotLight,
  plane: Mesh,
  controls: Controls;
class Controls {
  rotationSpeed = 0.02;
  sceneChildren = scene.children.length;
  addCube() {
    var cubeSize = Math.ceil(Math.random() * 3);
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;

    var width = (plane.geometry as PlaneGeometry).parameters.width;
    var height = (plane.geometry as PlaneGeometry).parameters.height;
    cube.position.x = -30 + Math.round(Math.random() * width);
    cube.position.y = 3 + Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * height);

    scene.add(cube);
    this.sceneChildren = scene.children.length;
  }
  removeCube() {
    var allChildren = scene.children;
    var lastObject = allChildren[allChildren.length - 1];
    if (
      lastObject instanceof THREE.Mesh &&
      lastObject.name !== "PlaneGeometry"
    ) {
      
      // scene.getObjectByName(lastObject.name);
      scene.remove(lastObject);
      this.sceneChildren = scene.children.length;
    }
  }
}
function paintGUI() {
  controls = new Controls();
  
  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0,0.5);
  gui.add(controls, "addCube");
  gui.add(controls, "removeCube");
  gui.add(controls, "sceneChildren").listen();
}


function PaintAxesHelper() {
  const axes = new AxesHelper(20);
  scene.add(axes);
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
  // add subtle ambient lighting
  var ambientLight = new AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  spotLight = new SpotLight(0xffffff);
  spotLight.shadowCameraVisible =true;
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function paintPlane() {
  // create the ground plane
  var planeGeometry = new PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new MeshLambertMaterial({ color: 0xffffff });
  plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.name = "PlaneGeometry";

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  // console.log(plane);
  scene.add(plane);
}

function render() {
  stats.update();

  // rotate the cubes around its axes
  scene.traverse(function (e) {
    // && e != plane
    if (e instanceof Mesh&& e.name!=='PlaneGeometry' ) {
      e.rotation.x += controls.rotationSpeed;
      e.rotation.y += controls.rotationSpeed;
      e.rotation.z += controls.rotationSpeed;
    }
  });

  // render using requestAnimationFrame
  // console.log(scene, camera);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
function init() {
  renderer = new WebGLRenderer();
  // render the scene
  renderer.setClearColor(new Color(0xeeeeee), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene = new Scene();
  // scene.fog = new THREE.FogExp2(0xffffff,0.015)
  // scene.fog = new THREE.Fog(0xfefefe, 0.015,70);
  // scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0x88888})
  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // position and point the camera to the center of the scene
  scene.add(camera);
  camera.position.x = -30; // 红线是X轴
  camera.position.y = 40; // 蓝线是y轴
  camera.position.z = 30; // 绿线是Z轴
  camera.lookAt(scene.position);
  PaintAxesHelper();
  initStats();
  paintGUI();
  paintLight();
  paintPlane();

  render();

  // add the output of the renderer to the html element
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
}
  
window.onload = init;
