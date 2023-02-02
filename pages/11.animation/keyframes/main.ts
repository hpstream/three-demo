import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import init from "./init";

let { camera, scene, renderer, render } = new init();
let clock = new THREE.Clock();



const pmremGenerator = new THREE.PMREMGenerator(renderer);

scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
scene.background = new THREE.Color(0xbfe3dd);


let controller = new OrbitControls(camera, renderer.domElement)

renderer.outputEncoding = THREE.sRGBEncoding;

let mixer: THREE.AnimationMixer;


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load('/static/assets/models/gltf/LittlestTokyo.glb', (gltf) => {
  const model = gltf.scene;

  model.scale.set(0.01, 0.01, 0.01);


  scene.add(model);

  mixer = new THREE.AnimationMixer(model);
  console.log(gltf)

  mixer.clipAction(gltf.animations[0]).play();

  // let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 1, roughness: 0 }))
  // scene.add(box);


})




render(() => {
  const delta = clock.getDelta();

  mixer && mixer.update(delta);


});