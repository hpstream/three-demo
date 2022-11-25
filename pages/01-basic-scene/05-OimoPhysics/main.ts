
import { GUI } from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { OimoPhysics } from "three/examples/jsm/physics/OimoPhysics";




let width = window.innerWidth;
let height = window.innerHeight;
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888)
let camera: THREE.PerspectiveCamera;
let mouse: THREE.Vector2 = new THREE.Vector2(1, 1);
let boxs: THREE.InstancedMesh;
let renderer = new THREE.WebGLRenderer({
  antialias: true
});
// renderer.physicallyCorrectLights = true;
let raycaster = new THREE.Raycaster();
renderer.setPixelRatio(window.devicePixelRatio);
// let amount = 4;
let count = 100;
renderer.shadowMap.enabled = true;


initLight();
initBox();
initCamera();
inigtAxes();
// enablePhysics();
render();
let gui = new GUI();
let s = gui.addFolder('控制');
s.open();



// 环境光不产生投影
function initLight() {
  const hemiLight = new THREE.HemisphereLight();
  hemiLight.intensity = 0.3;
  scene.add(hemiLight);

  let dirLight = new THREE.DirectionalLight();
  dirLight.castShadow = true;
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight)

}


async function initBox() {

  let physics = await OimoPhysics();
  // floor 
  let floor = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 10), new THREE.ShadowMaterial({
    color: 0x111111
  }))
  floor.position.set(0, -1, 0)
  // floor.rotateX(-Math.PI / 2)
  floor.receiveShadow = true;
  scene.add(floor)

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  // const meterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const meterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  boxs = new THREE.InstancedMesh(geometry, meterial, count);
  boxs.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
  boxs.castShadow = true;
  boxs.receiveShadow = true;

  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();

  for (let i = 0; i < boxs.count; i++) {
    matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() * -0.5);
    boxs.setMatrixAt(i, matrix);
    boxs.setColorAt(i, color.setHex(Math.random() * 0xffffff));

  }
  // console.log(mesh)

  scene.add(boxs)

  physics.addMesh(floor, 0)
  physics.addMesh(boxs, 1)
  const geometrySphere = new THREE.IcosahedronGeometry(0.15, 3);
  let spheres = new THREE.InstancedMesh(geometrySphere, meterial, 100);
  spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
  spheres.castShadow = true;
  spheres.receiveShadow = true;
  scene.add(spheres);

  for (let i = 0; i < spheres.count; i++) {

    matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
    spheres.setMatrixAt(i, matrix);
    spheres.setColorAt(i, color.setHex(0xffffff * Math.random()));



  }


  setInterval(() => {

    let index = Math.floor(Math.random() * boxs.count);
    let position = new THREE.Vector3();
    position.set(0, Math.random() + 1, 0);
    physics.setMeshPosition(boxs, position, index);



    index = Math.floor(Math.random() * spheres.count);

    position.set(0, Math.random() + 1, 0);
    physics.setMeshPosition(spheres, position, index);

  }, 1000 / 60);
  physics.addMesh(spheres, 1);


  // setInterval(() => {
  //   const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  //   const meterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  //   let mesh = new THREE.Mesh(geometry, meterial)
  //   mesh.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
  //   scene.add(mesh)

  //   const geometr1 = new THREE.IcosahedronGeometry(0.15, 3);
  //   const meterial1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  //   let mesh1 = new THREE.Mesh(geometr1, meterial1)
  //   mesh1.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
  //   scene.add(mesh1)

  //   physics.addMesh(mesh, 1)
  //   physics.addMesh(mesh1, 1)
  // }, 100)
}
new OrbitControls(camera, renderer.domElement);
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);



// 添加辅助轴
function inigtAxes() {
  // r,g,b => red,green,blue;
  scene.add(new THREE.AxesHelper(10))
}


function render() {

  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse, camera);


  requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

window.addEventListener('mousemove', (event) => {
  event.preventDefault();
  //从左到右 -1，1；
  //从下到上是-1，1

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
})

// 2.创建相机

function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  scene.add(camera)
}




