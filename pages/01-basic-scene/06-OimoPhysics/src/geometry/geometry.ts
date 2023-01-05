import * as THREE from "three";

import { OimoPhysics } from "three/examples/jsm/physics/OimoPhysics";

import * as OIMO from "oimo";

console.log(OIMO)
let bodys = [];
let abc = 0;
let physics = new OIMO.World({
  timestep: 1 / 60,
  iterations: 8,
  broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
  worldscale: 1, // scale full world 
  random: true,  // randomize sample
  info: false,   // calculate statistic or not
  gravity: [0, -9.8, 0]
});


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
    // console.log(this.floor)

    this.addMesh(this.floor, 'box', 0)



    let count = 10;
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


    // this.scene.add(boxs)
    // this.addMesh(boxs, 'box', 1)

    //---- 二十面缓冲几何体
    // const geometrySphere = new THREE.IcosahedronGeometry(0.15, 3);
    // let spheres = new THREE.InstancedMesh(geometrySphere, meterial, count);
    // spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
    // spheres.castShadow = true;
    // spheres.receiveShadow = true;


    // for (let i = 0; i < spheres.count; i++) {
    //   matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
    //   spheres.setMatrixAt(i, matrix);
    //   spheres.setColorAt(i, color.setHex(0xffffff * Math.random()));

    // }
    // this.scene.add(spheres);
    // spheres.name = 'IcosahedronGeometry';
    // this.addMesh(spheres, 'sphere', 1)


    let position = new THREE.Vector3(0, 0, 0)
    // for (let index = 0; index < 100; index++) {


    // }

    // setInterval(() => {
    //   const geometr1 = new THREE.IcosahedronGeometry(0.15, 3);
    //   const meterial1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    //   let mesh1 = new THREE.Mesh(geometr1, meterial1)
    //   mesh1.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
    //   this.scene.add(mesh1)

    //   this.addMesh(mesh1, 'sphere', 1)

    //   const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    //   const meterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    //   let mesh = new THREE.Mesh(geometry, meterial)
    //   mesh.position.set(Math.random() - 0.5, Math.random() * 4, Math.random() * -0.5);
    //   this.scene.add(mesh)
    //   this.addMesh(mesh, 'sphere', 1)
    // }, 1000 / 60);

    physics.postLoop = () => {

      var m;

      bodys.forEach(function (b, id) {

        if (b.type === 1) {
          m = b.mesh;
          m.position.copy(b.getPosition());
          m.quaternion.copy(b.getQuaternion());
        }
      });
    };
    physics.play();

  }
  addMesh(mesh: THREE.Mesh<any, any>, type: string, move: number) {
    console.log(mesh.geometry.parameters)
    let { width, height, depth, radius } = mesh.geometry.parameters
    console.log(mesh)


    let body = physics.add({
      type: type, // type of shape : sphere, box, cylinder 
      size: [width || radius, height || radius, depth || radius], // size of shape
      pos: [mesh.position.x, mesh.position.y, mesh.position.z], // start position in degree
      rot: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z], // start rotation in degree
      move: !!move, // dynamic or statique
      density: 1,
      friction: 1,
      restitution: 0.2,
      belongsTo: 1, // The bits of the collision groups to which the shape belongs.
      collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
    });
    body.mesh = mesh;
    bodys.push(body)



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


