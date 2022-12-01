import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  soldier: THREE.Group;
  mixer: THREE.AnimationMixer;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({
      color: 0x999999
    }))
    plane.rotation.set(-Math.PI / 2, 0, 0);
    plane.receiveShadow = true;
    this.scene.add(plane)
    const loader = new GLTFLoader();
    loader.load('/static/assets/models/gltf/Soldier.glb', (gltf) => {
      console.log(gltf);
      let soldier = this.soldier = gltf.scene;
      soldier.traverse((object) => {
        // if (object.isMesh) {

        // }
        // console.log(object)
        object.castShadow = true;
      })
      this.scene.add(soldier)
      let mixer = this.mixer = new THREE.AnimationMixer(this.soldier);
      let i = 1;

      let actions: THREE.AnimationAction[] = [];
      for (let i = 0; i < gltf.animations.length; i++) {
        actions.push(mixer.clipAction(gltf.animations[i]));
      }
      setInterval(() => {

        i++;
        actions[(i - 1) % 4].stop();
        actions[i % 4].play();

      }, 2000)
    })

  }


  initFloor() {
  }

  initCube() {
  }
}
