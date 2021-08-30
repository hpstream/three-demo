import { Scene,WebGL1Renderer,PerspectiveCamera, Color, AxesHelper} from "three";
// import * as THREE from "three";
// 学习目标：
// 1. 理解渲染器， 场景，相机的概念。
// 2. 理解辅助坐标系。

function init() {
  const renderer = new WebGL1Renderer();
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  // render the scene
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new Color(0xEEEEEE));
 

  // position and point the camera to the center of the scene
  camera.position.x = -40;// 红线是X轴
  camera.position.y = 30; // 蓝线是y轴
  camera.position.z = 30; // 绿线是Z轴


  // show axes in the screen
  const axes = new AxesHelper(10);
  scene.add(axes);
  console.log(scene.position);

  camera.lookAt(scene.position);
  renderer.render(scene, camera);

  // add the output of the renderer to the html element
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
}



 window.onload = init;