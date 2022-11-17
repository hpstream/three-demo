
import { GUI } from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let width = window.innerWidth;
let height = window.innerHeight;
let scene = new THREE.Scene();
let camera: THREE.PerspectiveCamera;
let mouse: THREE.Vector2 = new THREE.Vector2(1, 1);
let mesh: THREE.InstancedMesh;
let renderer = new THREE.WebGLRenderer({
  antialias: true
});
let raycaster = new THREE.Raycaster();
renderer.setPixelRatio(window.devicePixelRatio);
let amount = 10;
let count = Math.pow(amount, 3);
renderer.shadowMap.enabled = true;
let spotLight: THREE.SpotLight,
  spotLightHelper: THREE.SpotLightHelper;




initLight();
initBox();
initCamera();
inigtAxes();
render();
let gui = new GUI();
let s = gui.addFolder('控制');
s.open();


// 环境光不产生投影
function initLight() {
  let ambientLight = new THREE.HemisphereLight(0xffffff, 0x888888);
  scene.add(ambientLight);

}


function initBox() {

  const geometry = new THREE.IcosahedronGeometry(0.5, 3);
  const meterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

  mesh = new THREE.InstancedMesh(geometry, meterial, count);
  let index = 0;
  const offset = (amount - 1) / 2;

  const matrix = new THREE.Matrix4();
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        matrix.setPosition(offset - i, offset - j, offset - k);
        mesh.setMatrixAt(index, matrix)
        mesh.setColorAt(index, new THREE.Color(0xffffff));
        index++;
      }

    }
  }
  // console.log(mesh)

  scene.add(mesh)
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

  const intersection = raycaster.intersectObjects(scene.children);

  // console.log(intersection)
  let color = new THREE.Color();
  let white = new THREE.Color(0xffffff)
  if (intersection.length > 0) {
    const instanceId = intersection[0].instanceId;

    mesh.getColorAt(instanceId, color)

    if (color.equals(white)) {
      mesh.setColorAt(instanceId, color.setHex(Math.random() * 0xfffff))
      mesh.instanceColor.needsUpdate = true;
    }

  }

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




