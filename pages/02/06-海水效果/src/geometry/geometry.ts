
import * as THREE from "three";

let clock = new THREE.Clock();

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  spheres: (THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>)[];
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  planeGeometry: THREE.PlaneGeometry;


  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {

    let planeGeometry = this.planeGeometry = new THREE.PlaneGeometry(20000, 20000, 127, 127);
    planeGeometry.rotateX(- Math.PI / 2);

    const position = planeGeometry.attributes.position;
    // position.usage = THREE.DynamicDrawUsage;

    for (let i = 0; i < position.count; i++) {

      const y = 35 * Math.sin(i / 2);
      position.setY(i, y);

    }

    const texture = new THREE.TextureLoader().load('/static/assets/textures/water.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);

    let plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshBasicMaterial({
        map: texture,
        color: 0x0044ff
      })
    )

    this.scene.add(plane);





  }


  one() {


  }

  initCube() {

  }
}


