import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import init from "./init";
import { GUI } from "dat.gui";
let { camera, scene, renderer, render } = new init();
let clock = new THREE.Clock();



const pmremGenerator = new THREE.PMREMGenerator(renderer);

scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
scene.background = new THREE.Color(0xbfe3dd);


let controller = new OrbitControls(camera, renderer.domElement)

renderer.outputEncoding = THREE.sRGBEncoding;

let mixer: THREE.AnimationMixer;

scene.add(new THREE.AxesHelper(10))
let object;
let array;
let s;
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const basicUnifrom = {
  uTime: {
    value: 0
  }
}
loader.load('/static/untitled.glb', (gltf) => {
  const model = gltf.scene

  // let gd = model.getObjectByName("轨道")
  // gd.scale.set(100, 100, 100);
  // model.position.set(0, 0, 0)

  // for (let i = 0; i < gd.morphTargetInfluences.length; i++) {
  //   gd.morphTargetInfluences[i] = 1;
  // }

  // gd.morphTargetInfluences
  scene.add(model)
  console.log(gltf)

  let gui = new GUI();

  // 调试器 3 morph
  // const morphFolder = gui.addFolder('变形');
  // const morphNames = Object.keys(gd.morphTargetDictionary);
  // // console.log(morphNames)
  // for (let i = 0; i < morphNames.length; i++) {
  //   morphFolder.add(gd.morphTargetInfluences, `${i}`, 0, 2, 0.01).name(morphNames[i]);
  // }


  console.log(model)

  mixer = new THREE.AnimationMixer(model);
  const clipAction = mixer.clipAction(gltf.animations[0]);
  clipAction.play();




  // console.log(gltf)
  // scene.add(object);


})




render(() => {
  const delta = clock.getDelta();

  let arr = [];
  // console.log(s && s.position)






  mixer && mixer.update(delta);


});