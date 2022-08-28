import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

// 顶点着色器
import VertexShader from "./shader/water/vertex.glsl?raw";
// 片元着色器
import FragmentShader from "./shader/water/fragment.glsl?raw";
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
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const params = {
  uWaresFrequency: 14,
  uScale: 0.03,
  uXzScale: 1.5,
  uNoiseFrequency: 10,
  uNoiseScale: 1.5,
  uLowColor: "#ff0000",
  uHighColor: "#ffff00",
  uXspeed: 1,
  uTime: 0,
  uZspeed: 1,
  uNoiseSpeed: 1,
  uOpacity: 1,
};


// const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: VertexShader,
  fragmentShader: FragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uWaresFrequency: {
      value: params.uWaresFrequency,
    },
    uScale: {
      value: params.uScale,
    },
    uNoiseFrequency: {
      value: params.uNoiseFrequency,
    },
    uNoiseScale: {
      value: params.uNoiseScale,
    },
    uXzScale: {
      value: params.uXzScale,
    },
    uTime: {
      value: params.uTime,
    },
    uLowColor: {
      value: new THREE.Color(params.uLowColor),
    },
    uHighColor: {
      value: new THREE.Color(params.uHighColor),
    },
    uXspeed: {
      value: params.uXspeed,
    },
    uZspeed: {
      value: params.uZspeed,
    },
    uNoiseSpeed: {
      value: params.uNoiseSpeed,
    },
    uOpacity: {
      value: params.uOpacity,
    },
  },
  transparent: true,
});
gui
  .add(params, "uWaresFrequency")
  .min(1)
  .max(100)
  .step(0.1)
  .onChange((value) => {
    shaderMaterial.uniforms.uWaresFrequency.value = value;
  });

gui
  .add(params, "uScale")
  .min(0)
  .max(0.2)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uScale.value = value;
  });

gui
  .add(params, "uNoiseFrequency")
  .min(1)
  .max(100)
  .step(0.1)
  .onChange((value) => {
    shaderMaterial.uniforms.uNoiseFrequency.value = value;
  });

gui
  .add(params, "uNoiseScale")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uNoiseScale.value = value;
  });

gui
  .add(params, "uXzScale")
  .min(0)
  .max(5)
  .step(0.1)
  .onChange((value) => {
    shaderMaterial.uniforms.uXzScale.value = value;
  });

gui.addColor(params, "uLowColor").onFinishChange((value) => {
  shaderMaterial.uniforms.uLowColor.value = new THREE.Color(value);
});
gui.addColor(params, "uHighColor").onFinishChange((value) => {
  shaderMaterial.uniforms.uHighColor.value = new THREE.Color(value);
});

gui
  .add(params, "uXspeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uXspeed.value = value;
  });

gui
  .add(params, "uZspeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uZspeed.value = value;
  });

gui
  .add(params, "uNoiseSpeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uNoiseSpeed.value = value;
  });

gui
  .add(params, "uOpacity")
  .min(0)
  .max(1)
  .step(0.01)
  .onChange((value) => {
    shaderMaterial.uniforms.uOpacity.value = value;
  });


// const plane = new THREE.PlaneBufferGeometry(1, 1, 512, 512)

// 创建平面
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 512, 512),
  shaderMaterial
);

floor.rotateX(-Math.PI / 2)


console.log(floor);
scene.add(floor);

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


});

// 将渲染器添加到body
document.body.appendChild(renderer.domElement);

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转


const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
  shaderMaterial.uniforms.uTime.value = elapsedTime;
  controls.update();
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

animate();
