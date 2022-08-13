import "./assets/css/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

// 目标：了解threejs的基本内容

// scene
let scene = new THREE.Scene();


/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k, 0.1, 400);
camera.position.set(0, 0, 20);
// let axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// 场景一
let cubeGroup = new THREE.Group();
let cubeArr = [];

// 鼠标的位置对象
const mouse = new THREE.Vector2();
function scene1() {
  const cubeGeometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
  });
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let z = 0; z < 5; z++) {
        const cube = new THREE.Mesh(cubeGeometry, material);
        cube.position.set(i * 2 - 4, j * 2 - 4, z * 2 - 4);
        cubeGroup.add(cube);
        cubeArr.push(cube);
      }
    }
  }
  // cubeGroup.position.set(0, -30, 0)
  scene.add(cubeGroup);

  // 创建投射光线对象
  const raycaster = new THREE.Raycaster();
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });

  // 监听鼠标的位置
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX / window.innerWidth - 0.5;
    mouse.y = event.clientY / window.innerHeight - 0.5;
  });

  // 监听鼠标的位置
  window.addEventListener("click", (event) => {
    //   console.log(event);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
    raycaster.setFromCamera(mouse, camera);
    let result = raycaster.intersectObjects(cubeArr);
    //   console.log(result);
    //   result[0].object.material = redMaterial;
    result.forEach((item) => {
      (item.object as any).material = redMaterial;
    });
  });
}

var sjxGroup = new THREE.Group();
function scene2() {
  for (let i = 0; i < 50; i++) {
    // 每一个三角形，需要3个顶点，每个顶点需要3个值
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      if (j % 3 == 1) {
        positionArray[j] = Math.random() * 10 - 5;
      } else {
        positionArray[j] = Math.random() * 10 - 5;
      }
    }
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    // 根据几何体和材质创建物体
    let sjxMesh = new THREE.Mesh(geometry, material);
    //   console.log(mesh);
    sjxGroup.add(sjxMesh);
  }
  sjxGroup.position.set(0, -30, 0);
  scene.add(sjxGroup);
}

const sphereGroup = new THREE.Group();
let smallBall: THREE.Mesh = null;
function scene3() {
  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const spherematerial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  });
  const sphere = new THREE.Mesh(sphereGeometry, spherematerial);
  // 投射阴影
  sphere.castShadow = true;

  sphereGroup.add(sphere);

  // // 创建平面
  const planeGeometry = new THREE.PlaneBufferGeometry(20, 20);
  const plane = new THREE.Mesh(planeGeometry, spherematerial);
  plane.position.set(0, -1, 0);
  plane.rotation.x = -Math.PI / 2;
  // 接收阴影
  plane.receiveShadow = true;
  sphereGroup.add(plane);

  // 灯光
  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  sphereGroup.add(light);

  smallBall = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.1, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  //直线光源
  const pointLight = new THREE.SpotLight(0xff0000, 1);
  pointLight.target = sphereGroup;
  // pointLight.position.set(0, 0, 0);

  pointLight.castShadow = true;
  pointLight.angle = Math.PI / 8;
  // pointLight.penumbra = 0.1;
  pointLight.decay = 2;
  pointLight.distance = 40;
  pointLight.shadow.mapSize.width = 512;
  pointLight.shadow.mapSize.height = 512;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 20;
  pointLight.shadow.radius = 20;
  // pointLight.shadow.focus = 1;

  // 设置阴影贴图模糊度
  pointLight.shadow.radius = 20;
  // 设置阴影贴图的分辨率
  pointLight.shadow.mapSize.set(2048, 2048);

  let help = new THREE.CameraHelper(pointLight.shadow.camera)
  smallBall.position.set(4, 4, 0);

  // 设置透视相机的属性
  smallBall.add(pointLight);
  // smallBall.add(help);
  sphereGroup.add(smallBall);
  // sphereGroup.add(pointLight)
  // sphereGroup.add(help)

  sphereGroup.position.set(0, -60, 0);
  scene.add(sphereGroup);
}


scene3();
scene2();
scene1();
/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
camera.lookAt(0, 0, 0)
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(document.body)

let clock = new THREE.Clock()
// 如果不重新绘制，物体会禁止就会不动
function render() {
  let time = clock.getElapsedTime()


  smallBall.position.x = Math.sin(time) * 8 - 4;
  smallBall.position.z = Math.cos(time) * 8 - 4;

  //   根据当前滚动的scrolly，去设置相机移动的位置
  camera.position.y = -(window.scrollY / window.innerHeight) * 30;

  camera.position.x = mouse.x * 10;


  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});


