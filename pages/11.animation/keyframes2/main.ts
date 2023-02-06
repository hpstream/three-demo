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

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

let sliders = [];
let linePathPotin = [];
let curve: THREE.CatmullRomCurve3;
loader.load('/static/track_测试单个.glb', (gltf) => {
  const model = gltf.scene;

  // console.log(model)
  scene.add(model)

  const list = gltf.scene.children.filter(item => item.name.includes("Cube"))
  list.forEach((item: any, idx) => {
    const len = list.length - 1
    item.material.color.set(0x1890ff)

    sliders.push({
      target: item,
      idx,
      time: Number((idx / len).toFixed(3))
    })
  })
  gltf.scene.children.forEach((item: any, idx) => {
    if (item.name.includes("NURBS_路径")) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.04, 0.04),
        new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      );
      cube.position.copy(item.position)
      cube.position.setY(2)
      scene.add(cube);
      linePathPotin.push(item.position)
    }
  })
  curve = new THREE.CatmullRomCurve3(linePathPotin);

  console.log(sliders, linePathPotin)



})


let diff = 0.001;
function dealSliders() {
  sliders && sliders.forEach((slider: any) => {
    slider.time += diff

    if (slider.time >= (1 - diff)) {
      slider.time = 0
      return
    }

    if (slider.time > diff) {
      slider.target.position.copy(curve.getPointAt(slider.time - diff));
    }


  })

}



render(() => {
  const delta = clock.getDelta();



  dealSliders();

  mixer && mixer.update(delta);


});