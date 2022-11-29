import * as THREE from "three";

import { OimoPhysics } from "three/examples/jsm/physics/OimoPhysics";
export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  torusKnot: THREE.Mesh<THREE.TorusKnotGeometry, THREE.MeshPhongMaterial>;

  constructor(public scene: THREE.Scene) {
    this.init();

  }

  init() {
    this.initFloor();
    this.initCube();
  }


  initFloor() {
    let floor = this.floor = new THREE.Mesh(new THREE.BoxGeometry(10, 0.15, 10), new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150, // 高亮的程度，越高的值越闪亮。默认值为 30.
      specular: 0x111111 // 材质的高光颜色。默认值为0x111111（深灰色）的颜色
    }))
    floor.position.set(0, 0, 0)
    floor.scale.multiplyScalar(3);
    // floor.rotateX(-Math.PI / 2)
    floor.receiveShadow = true;
    this.scene.add(floor)
  }
  async initCube() {

    // 圆环缓冲扭结几何体
    const geometry = new THREE.TorusKnotGeometry(25, 8, 75, 20);
    let material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 150,
      specular: 0x222222
    })
    const torusKnot = this.torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.scale.multiplyScalar(1 / 18);
    torusKnot.position.y = 3;
    torusKnot.castShadow = true;
    this.scene.add(torusKnot);


    let cube = this.cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), material);
    cube.position.set(8, 3, 8)
    cube.castShadow = true;
    this.scene.add(cube)
  }


}


