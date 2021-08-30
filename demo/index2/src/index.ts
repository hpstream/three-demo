import { Scene,WebGL1Renderer,PerspectiveCamera, Color, AxesHelper, PlaneGeometry, MeshBasicMaterial, Mesh, BoxGeometry, SphereGeometry} from "three";
// import * as THREE from "three";
// 学习目标：
// 1. 画出平面几何体
// 2. 画出立方几何体
// 3. 画出球几何体

let renderer: WebGL1Renderer, scene: Scene, camera: PerspectiveCamera;

function paintGeometry() {
   // 绘画一个灰色，平面几何体
   const planeGeometry = new PlaneGeometry(20, 20);
   const planeMaterial = new MeshBasicMaterial({ color: 0xcccccc });
   var plane = new Mesh(planeGeometry, planeMaterial);
   plane.rotation.x = -0.5 * Math.PI;
   scene.add(plane);
   var cubeGeometry = new BoxGeometry(4,4,4)
   var cubeMaterial = new MeshBasicMaterial({color:0xff0000,wireframe:true})
   var cube = new Mesh(cubeGeometry,cubeMaterial)
   cube.position.x = 2;
   cube.position.y = 2;
   cube.position.z = 2;
   scene.add(cube)

   var shpereGeometry = new SphereGeometry(8,20,20)
   var shpereMeterial = new MeshBasicMaterial({color:0x7777ff,wireframe:true})
   var shpere = new Mesh(shpereGeometry,shpereMeterial)
   shpere.position.x = -10;
   shpere.position.y = 10;
   shpere.position.z = -10;
   scene.add(shpere);
}

function init() {
   renderer = new WebGL1Renderer();
   scene = new Scene();
   camera = new PerspectiveCamera();
  // render the scene
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new Color(0xEEEEEE));
  
  paintGeometry();

 
  // position and point the camera to the center of the scene
  camera.position.x = -40;// 红线是X轴
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