import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";



export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  mixer: THREE.AnimationMixer;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    const loader = new GLTFLoader();
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader)


    loader.load('/static/assets/models/gltf/LittlestTokyo.glb', (gltf) => {
      let model = gltf.scene;
      this.scene.add(gltf.scene);
      gltf.scene.scale.set(0.01, 0.01, 0.01)
      gltf.scene.traverse((child) => { })


      let mixer = this.mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();

    })
  }


  initFloor() {
  }

  initCube() {

  }
}

