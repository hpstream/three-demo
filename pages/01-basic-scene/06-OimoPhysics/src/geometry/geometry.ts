import * as THREE from "three";

import { OimoPhysics } from "three/examples/jsm/physics/OimoPhysics";
export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;

  constructor(public scene: THREE.Scene) {
    this.init();

  }

  init() {
    this.initFloor();
    this.initCube();
  }


  initFloor() {
    let floor = this.floor = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 10), new THREE.MeshLambertMaterial({
      color: 0x333333
    }))
    floor.position.set(0, -1, 0)
    // floor.rotateX(-Math.PI / 2)
    floor.receiveShadow = true;
    this.scene.add(floor)
  }
  async initCube() {
    let physics = await OimoPhysics();
    physics.addMesh(this.floor, 0)

    let count = 100;
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // const meterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const meterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
    let boxs = new THREE.InstancedMesh(geometry, meterial, count);
    boxs.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
    boxs.castShadow = true;
    boxs.receiveShadow = true;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let i = 0; i < boxs.count; i++) {
      matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() * -0.5);
      boxs.setMatrixAt(i, matrix);
      boxs.setColorAt(i, color.setHex(Math.random() * 0xffffff));

    }

    this.scene.add(boxs)
    physics.addMesh(boxs, 1)

    //---- 二十面缓冲几何体
    const geometrySphere = new THREE.IcosahedronGeometry(0.15, 3);
    let spheres = new THREE.InstancedMesh(geometrySphere, meterial, count);
    spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
    spheres.castShadow = true;
    spheres.receiveShadow = true;


    for (let i = 0; i < spheres.count; i++) {
      matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
      spheres.setMatrixAt(i, matrix);
      spheres.setColorAt(i, color.setHex(0xffffff * Math.random()));
    }
    this.scene.add(spheres);
    physics.addMesh(spheres, 1)


    let position = new THREE.Vector3(0, 0, 0)
    setInterval(() => {
      let index = Math.floor(Math.random() * count);

      position.set(0, Math.random() + 1, 0);
      physics.setMeshPosition(boxs, position, index);

      //

      index = Math.floor(Math.random() * count);

      position.set(0, Math.random() + 1, 0);
      physics.setMeshPosition(spheres, position, index);
    }, 1000 / 60)

  }

  async initCube1() {
    let physics = await OimoPhysics();
    physics.addMesh(this.floor, 0)
    setInterval(() => {
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const meterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      let mesh = new THREE.Mesh(geometry, meterial)
      mesh.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
      this.scene.add(mesh)

      const geometr1 = new THREE.IcosahedronGeometry(0.15, 3);
      const meterial1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      let mesh1 = new THREE.Mesh(geometr1, meterial1)
      mesh1.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
      this.scene.add(mesh1)

      physics.addMesh(mesh, 1)
      physics.addMesh(mesh1, 1)
    }, 100)
  }
}


