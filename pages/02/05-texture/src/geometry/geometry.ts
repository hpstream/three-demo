
import * as THREE from "three";


export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  spheres: (THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>)[];
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;


  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {

    const texture = new THREE.TextureLoader().load('/static/assets/textures/crate.gif')

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const metarial = new THREE.MeshBasicMaterial({
      map: texture
    })

    let cube = this.cube = new THREE.Mesh(geometry, metarial);
    this.scene.add(cube);




  }


  one() {


  }

  initCube() {

  }
}


