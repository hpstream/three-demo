import * as THREE from "three";

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
    let floor = this.floor = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 10), new THREE.ShadowMaterial({
      color: 0x111111
    }))
    floor.position.set(0, -1, 0)
    // floor.rotateX(-Math.PI / 2)
    floor.receiveShadow = true;
    this.scene.add(floor)
  }

  initCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const meterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    let cube = this.cube = new THREE.Mesh(geometry, meterial);
    cube.castShadow = true;
    cube.position.set(0, 1, 0);

    this.scene.add(cube)
  }
}


async function initBox() {

  // let physics = await OimoPhysics();


  // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  // // const meterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  // const meterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  // boxs = new THREE.InstancedMesh(geometry, meterial, count);
  // boxs.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
  // boxs.castShadow = true;
  // boxs.receiveShadow = true;

  // const matrix = new THREE.Matrix4();
  // const color = new THREE.Color();

  // for (let i = 0; i < boxs.count; i++) {
  //   matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() * -0.5);
  //   boxs.setMatrixAt(i, matrix);
  //   boxs.setColorAt(i, color.setHex(Math.random() * 0xffffff));

  // }
  // console.log(mesh)

  // scene.add(boxs)

  // physics.addMesh(floor, 0)
  // physics.addMesh(boxs, 1)
  // const geometrySphere = new THREE.IcosahedronGeometry(0.15, 3);
  // let spheres = new THREE.InstancedMesh(geometrySphere, meterial, 100);
  // spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
  // spheres.castShadow = true;
  // spheres.receiveShadow = true;
  // scene.add(spheres);

  for (let i = 0; i < spheres.count; i++) {

    matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
    spheres.setMatrixAt(i, matrix);
    spheres.setColorAt(i, color.setHex(0xffffff * Math.random()));



  }


  // setInterval(() => {

  //   let index = Math.floor(Math.random() * boxs.count);
  //   let position = new THREE.Vector3();
  //   position.set(0, Math.random() + 1, 0);
  //   physics.setMeshPosition(boxs, position, index);



  //   index = Math.floor(Math.random() * spheres.count);

  //   position.set(0, Math.random() + 1, 0);
  //   physics.setMeshPosition(spheres, position, index);

  // }, 1000 / 60);
  // physics.addMesh(spheres, 1);


  // setInterval(() => {
  //   const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  //   const meterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  //   let mesh = new THREE.Mesh(geometry, meterial)
  //   mesh.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
  //   scene.add(mesh)

  //   const geometr1 = new THREE.IcosahedronGeometry(0.15, 3);
  //   const meterial1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  //   let mesh1 = new THREE.Mesh(geometr1, meterial1)
  //   mesh1.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
  //   scene.add(mesh1)

  //   physics.addMesh(mesh, 1)
  //   physics.addMesh(mesh1, 1)
  // }, 100)
}