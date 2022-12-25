
// import Ammo = require('ammojs-typed');

import { Camera } from '../instance/camera';
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';


import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Clock } from 'three';
let physicsWorld: Ammo.btSoftRigidDynamicsWorld;
let textureLoader = new THREE.TextureLoader();
let clock = new Clock();

const gravityConstant = -9.82;
const rigidBodies = [];
const margin = 0.05;
let hinge, cloth;
let transformAUX1: Ammo.btTransform;
let armMovement = 0;


export class Page {

  camera: Camera;
  renderer: renderer;
  scene: Scene;
  light: Light;
  geometry: Geometry;
  cube: any;
  orbitControls: OrbitControls;
  mouseY: number = 0;
  mouseX: number = 0;
  physicsUniverse: Ammo.btDiscreteDynamicsWorld;
  meshList: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial>[] = [];
  syncList: any[] = [];
  dispatcher: Ammo.btCollisionDispatcher;

  constructor() {
    this.init()
    // 
  }
  init() {
    // 图形世界
    // 物理世界




    Ammo().then((AmmoLib) => {

      console.log(1);
      // Ammo = AmmoLib;



      // Physics variables

      this.initGraphics();
      this.initPhysics();
      this.initObjects();
      this.initEvent();

    })


  }

  initPhysics() {
    // Physics configuration
    let collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    let dispatcher = this.dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    let broadphase = new Ammo.btDbvtBroadphase();
    let solver = new Ammo.btSequentialImpulseConstraintSolver();
    let softBodySolver = new Ammo.btDefaultSoftBodySolver();

    physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
    physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0));


    physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0));

    transformAUX1 = new Ammo.btTransform();
  }
  initGraphics() {
    this.camera = new Camera();
    this.scene = new Scene();
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;

    this.renderer = new renderer(scene, camera);
    this.createHelpUtils();

    // 添加灯光
    this.light = new Light(scene);
    this.light.init();



    // 添加物体
    let box = this.geometry = new Geometry(scene);
  }
  initObjects() {

    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    pos.set(0, -0.5, 0);
    quat.set(0, 0, 0, 1);

    // 地面
    const ground = this.createParalellObjects(40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial({ color: 0xfffff }));

    ground.castShadow = true;
    ground.receiveShadow = true;
    textureLoader.load('/static/assets/textures/grid.png', function (texture) {

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(40, 40);
      ground.material.map = texture;
      ground.material.needsUpdate = true;

    });



    // 墙
    const brickMass = 0.5;
    const brickLength = 1.2;
    const brickDepth = 0.6;
    const brickHeight = 0.6;
    const numBricksLength = 6;
    const numBricksHeight = 8;

    const z0 = -numBricksLength * brickDepth * 0.5;
    pos.set(0, brickHeight * 0.5, z0);
    quat.set(0, 0, 0, 1)

    for (let j = 0; j < numBricksHeight; j++) {
      const oddRow = (j % 2) == 1;
      pos.z = z0;
      if (oddRow) {
        pos.z -= 0.25 * brickLength;
      }

      const nRow = oddRow ? numBricksLength + 1 : numBricksLength;
      for (let i = 0; i < nRow; i++) {
        let brickLengthCurrent = brickLength;
        let brickMassCurrent = brickMass;
        if (oddRow && (i == 0 || i == nRow - 1)) {
          brickLengthCurrent *= 0.5;
          brickMassCurrent *= 0.5;
        }

        const brick = this.createParalellObjects(brickDepth, brickHeight, brickLengthCurrent, brickMassCurrent, pos, quat, this.createMaterial());

        brick.castShadow = true;
        brick.receiveShadow = true;
        if (oddRow && (i == 0 || i == nRow - 2)) {
          pos.z += 0.75 * brickLength;
        } else {
          pos.z += brickLength;
        }

      }
      pos.y += brickHeight;

    }



    // 布
    const clothWidth = 4;
    const clothHeight = 3;
    const clothNumSegmentsZ = clothWidth * 5;
    const clothNumSegmentsY = clothHeight * 5;
    const clothPos = new THREE.Vector3(- 3, 3, 2);

    const clothGeometry = new THREE.PlaneGeometry(clothWidth, clothHeight, clothNumSegmentsZ, clothNumSegmentsY);
    clothGeometry.rotateY(Math.PI * 0.5);
    clothGeometry.translate(
      clothPos.x,
      clothPos.y + clothHeight * 0.5,
      clothPos.z - clothWidth * 0.5
    );

    const clothMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    cloth = new THREE.Mesh(clothGeometry, clothMaterial);
    cloth.castShadow = true;
    cloth.receiveShadow = true;
    this.scene.scene.add(cloth);


    textureLoader.load('/static/assets/textures/grid.png', function (texture) {

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(clothNumSegmentsZ, clothNumSegmentsY);
      cloth.material.map = texture;
      cloth.material.needsUpdate = true;

    });
    //布的物理对象

    // Cloth physic object
    const softBodyHelpers = new Ammo.btSoftBodyHelpers();
    const clothCorner00 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z);
    const clothCorner01 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z - clothWidth);
    const clothCorner10 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z);
    const clothCorner11 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z - clothWidth);
    const clothSoftBody = softBodyHelpers.CreatePatch(
      physicsWorld.getWorldInfo(),
      clothCorner00,
      clothCorner01,
      clothCorner10,
      clothCorner11,
      clothNumSegmentsZ + 1,
      clothNumSegmentsY + 1,
      0,
      true
    );
    const sbConfig = clothSoftBody.get_m_cfg();
    sbConfig.set_viterations(10);

    // 设置布的弹性
    sbConfig.set_piterations(10);

    clothSoftBody.setTotalMass(0.9, false);
    Ammo.castObject(clothSoftBody, Ammo.btCollisionObject)
      .getCollisionShape()
      .setMargin(margin * 3);

    physicsWorld.addSoftBody(clothSoftBody, 1, - 1);
    cloth.userData.physicsBody = clothSoftBody;
    // Disable deactivation
    clothSoftBody.setActivationState(4);


    // 横梁
    const armMass = 2;
    const armLength = 3 + clothWidth;
    const pylonHeight = clothPos.y + clothHeight;
    // 底座
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    pos.set(clothPos.x, 0.1, clothPos.z - armLength);
    quat.set(0, 0, 0, 1);

    const base = this.createParalellObjects(1, 0.2, 1, 0, pos, quat, baseMaterial);
    base.castShadow = true;
    base.receiveShadow = true;


    // 立杆
    pos.set(clothPos.x, 0.5 * pylonHeight, clothPos.z - armLength);
    const pylon = this.createParalellObjects(0.4, pylonHeight, 0.4, 0, pos, quat, baseMaterial);
    pylon.castShadow = true;
    pylon.receiveShadow = true;


    // 横梁
    pos.set(clothPos.x, pylonHeight + 0.2, clothPos.z - 0.5 * armLength);
    const arm = this.createParalellObjects(0.4, 0.4, armLength + 0.4, armMass, pos, quat, baseMaterial);
    arm.castShadow = true;
    arm.receiveShadow = true;

    //Hinge constraint to move the arm
    const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0);
    const pivotB = new Ammo.btVector3(0, - 0.2, - armLength * 0.5);
    const axis = new Ammo.btVector3(0, 1, 0);
    hinge = new Ammo.btHingeConstraint(
      pylon.userData.physicsBody,
      arm.userData.physicsBody,
      pivotA,
      pivotB,
      axis,
      axis,
      true
    );
    physicsWorld.addConstraint(hinge, true);

    // Glue the cloth to the arm
    const influence = 0.5;
    clothSoftBody.appendAnchor(0, arm.userData.physicsBody, false, influence);
    clothSoftBody.appendAnchor(clothNumSegmentsZ, arm.userData.physicsBody, false, influence);





  }
  createMaterial() {

    return new THREE.MeshPhongMaterial({ color: this.createRandomColor() })
  }
  createRandomColor(): number {
    return Math.floor(Math.random() * (1 << 24));
  }
  createParalellObjects(sx: number, sy: number, sz: number, mass: number, pos: THREE.Vector3, quat: THREE.Quaternion, material: THREE.MeshPhongMaterial) {

    // 图形对象
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1),
      material
    );
    // 物理对象
    const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
    shape.setMargin(margin);
    this.createRigidBody(mesh, shape, mass, pos, quat);

    return mesh;



  }
  createRigidBody(mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial>, shape: Ammo.btBoxShape, mass: number, pos: THREE.Vector3, quat: THREE.Quaternion) {
    mesh.position.copy(pos);
    mesh.quaternion.copy(quat)

    // 物理对象准备工作
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w))

    const motionState = new Ammo.btDefaultMotionState(transform);

    const localIneria = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localIneria);


    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localIneria)
    // 物理对象
    const body = new Ammo.btRigidBody(rbInfo);

    mesh.userData.physicsBody = body;

    this.scene.scene.add(mesh);
    if (mass > 0) {
      rigidBodies.push(mesh);
      body.setActivationState(4);
    }

    // console.log(rigidBodies)
    physicsWorld.addRigidBody(body)


  }


  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(100))
    let orbitControls = this.orbitControls = new OrbitControls(camera, this.renderer.renderer.domElement);
    this.orbitControls.target.set(0, 2, 0);
    this.orbitControls.update();

  }
  updatePhysics(delta: number) {

    // 折叶的更新
    hinge && hinge.enableAngularMotor(true, 0.8 * armMovement, 50);

    if (!physicsWorld) return;
    physicsWorld.stepSimulation(delta, 10);

    // 布的物理对象
    const softBody = cloth.userData.physicsBody;
    const nodes = softBody.get_m_nodes();
    // 布的内部几何的点
    const clothPositions = cloth.geometry.attributes.position.array;
    const numVerts = clothPositions.length / 3;

    let indexFloat = 0;

    for (let i = 0; i < numVerts; i++) {

      const node = nodes.at(i);
      const nodePos = node.get_m_x();
      clothPositions[indexFloat++] = nodePos.x();
      clothPositions[indexFloat++] = nodePos.y();
      clothPositions[indexFloat++] = nodePos.z();

    }

    cloth.geometry.computeVertexNormals();
    cloth.geometry.attributes.position.needsUpdate = true;
    cloth.geometry.attributes.normal.needsUpdate = true;

    // 所有的rigidbody/softBody 对应的mesh更新位置；
    // 
    for (let i = 0, il = rigidBodies.length; i < il; i++) {

      const objThree = rigidBodies[i];
      // console.log(objThree.userData)
      if (!objThree.userData) return;
      const objPhys = objThree.userData.physicsBody;
      const ms = objPhys.getMotionState();
      if (ms) {

        ms.getWorldTransform(transformAUX1);
        const p = transformAUX1.getOrigin();
        const q = transformAUX1.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

      }

    }

  }
  render = () => {
    let delta = clock.getDelta();
    this.renderer && this.renderer.render();

    this.updatePhysics(delta)

    this.orbitControls && this.orbitControls.update();

    requestAnimationFrame(this.render)
  }



  initEvent() {
    let { perspectiveCamera } = this.camera;
    let { renderer } = this.renderer;
    window.addEventListener('resize', () => {


      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
      perspectiveCamera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    window.addEventListener('keydown', function (event) {

      switch (event.keyCode) {

        // Q
        case 81:
          armMovement = 1;
          break;

        // A
        case 65:
          armMovement = - 1;
          break;

      }

    });

    window.addEventListener('keyup', function () {

      armMovement = 0;

    });





  }


}

