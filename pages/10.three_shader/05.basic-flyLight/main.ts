import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

// 顶点着色器
import VertexShader from "./shader/flyLight/vertex.glsl?raw";
// 片元着色器
import FragmentShader from "./shader/flyLight/fragment.glsl?raw";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


// 目标：认识shader

//创建gui对象
const gui = new dat.GUI();

// console.log(THREE);
// 初始化场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerHeight / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(0, 0, 2);
// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();
scene.add(camera);

// 加入辅助轴，帮助我们查看3维坐标轴
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//加载纹理
const rgbeLoader = new RGBELoader();
// "/static/textures/hdr/003.hdr"
rgbeLoader.loadAsync("/static/textures/hdr/003.hdr").then((texture) => {
  console.log(texture)
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture
})



// 创建纹理加载器对象

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/static/glsl/ca.jpeg");
// const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: VertexShader,
  fragmentShader: FragmentShader,
  side: THREE.DoubleSide,
  // transparent: true,
  uniforms: {},
});

const gltfLoader = new GLTFLoader();
let LightBox = null;
gltfLoader.load("/static/hdr/flay-light.glb", (gltf) => {

  gltf.scene.position.set(0, 0, 0);
  LightBox = gltf.scene.children[1];
  LightBox.material = shaderMaterial;
  console.log(gltf);
  scene.add(gltf.scene);
  gsap.to(gltf.scene.rotation, {
    y: 2 * Math.PI,
    duration: 10 + Math.random() * 30,
    repeat: -1,
  });
  gsap.to(gltf.scene.position, {
    // x: "+=" + Math.random() * 5,
    y: "+=" + Math.random() * 20,
    yoyo: true,
    duration: 5 + Math.random() * 10,
    repeat: -1,
  });
  for (let i = 0; i < 150; i++) {
    let flyLight = gltf.scene.clone(true);
    let x = (Math.random() - 0.5) * 300;
    let z = (Math.random() - 0.5) * 300;
    let y = Math.random() * 60 + 25;
    flyLight.position.set(x, y, z);
    gsap.to(flyLight.rotation, {
      y: 2 * Math.PI,
      duration: 10 + Math.random() * 30,
      repeat: -1,
    });
    gsap.to(flyLight.position, {
      // x: "+=" + Math.random() * 5,
      y: "+=" + Math.random() * 20,
      yoyo: true,
      duration: 5 + Math.random() * 10,
      repeat: -1,
    });
    scene.add(flyLight);
  }
});


// // 创建平面
// const floor = new THREE.Mesh(
//   new THREE.PlaneBufferGeometry(2, 2),
//   shaderMaterial
// );


// console.log(floor);
// scene.add(floor);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 0.2;

// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 监听屏幕大小改变的变化，设置渲染的尺寸
window.addEventListener("resize", () => {
  //   console.log("resize");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);



  // // 设置屏幕位置
  // shaderMaterial.uniforms.u_resolution.value.x = renderer.domElement.width;
  // shaderMaterial.uniforms.u_resolution.value.y = renderer.domElement.height;
  // console.log(renderer.domElement.width, renderer.domElement.height)
});

// 将渲染器添加到body
document.body.appendChild(renderer.domElement);

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
// controls.autoRotate = true;

const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
  //   console.log(elapsedTime);

  // shaderMaterial.uniforms.u_time.value = elapsedTime;

  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

animate();
