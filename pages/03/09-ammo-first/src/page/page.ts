// import Ammo = require('ammojs-typed');

import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Clock } from 'three';


let clock = new Clock();


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

  constructor() {
    this.init()
    // 
  }
  init() {
    // 图形世界
    // 物理世界




    Ammo().then(() => {
      console.log(1)
      this.initPhysicsUniverse();
      this.initGraphicsUniverse();
      this.createObjects();
      this.initEvent();
    })


  }
  initGraphicsUniverse() {
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
  initPhysicsUniverse() {
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const overlappingPairCache = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    let physicsUniverse = this.physicsUniverse = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);

    physicsUniverse.setGravity(new Ammo.btVector3(0, -75, 0))
  }
  createObjects() {

    this.createCube(40, new THREE.Vector3(10, -30, 10), 0, null);
    this.createCube(4, new THREE.Vector3(0, 10, 0), 1, null);
    this.createCube(2, new THREE.Vector3(10, 30, 0), 1, null);
    this.createCube(4, new THREE.Vector3(10, 20, 10), 1, null);
    this.createCube(6, new THREE.Vector3(5, 4, 20), 1, null);

    this.createCube(8, new THREE.Vector3(20, 100, 5), 1, null);
    this.createCube(8, new THREE.Vector3(20, 60, 25), 1, null);
    this.createCube(4, new THREE.Vector3(20, 100, 25), 1, null);
    this.createCube(2, new THREE.Vector3(20, 100, 25), 1, null);

  }
  createCube(size, positon, mass, rot_quaternion) {
    let quaternion;
    if (rot_quaternion == null) {
      quaternion = { x: 0, y: 0, z: 0, w: 0 };
    } else {
      quaternion = rot_quaternion;
    }

    let cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshPhongMaterial({
      color: Math.random() * 0xffffff
    }))

    cube.position.set(positon.x, positon.y, positon.z);
    this.scene.scene.add(cube)
    this.meshList.push(cube)

    // physics

    let tarnsform = new Ammo.btTransform();
    tarnsform.setIdentity();
    tarnsform.setOrigin(new Ammo.btVector3(positon.x, positon.y, positon.z))

    let defaultMotionState = new Ammo.btDefaultMotionState(tarnsform);

    tarnsform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w))
    // 设置碰撞几何结构
    let boxShape = new Ammo.btBoxShape(new Ammo.btVector3(size / 2, size / 2, size / 2))
    boxShape.setMargin(0.05);

    //
    let localInertia = new Ammo.btVector3(0, 0, 0);
    boxShape.calculateLocalInertia(mass, localInertia)

    let rigidBodyInfor = new Ammo.btRigidBodyConstructionInfo(mass, defaultMotionState, boxShape, localInertia);

    let rigidBody = new Ammo.btRigidBody(rigidBodyInfor);
    this.physicsUniverse.addRigidBody(rigidBody);
    cube.userData.physicsBody = rigidBody


  }
  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(100))
    let orbitControls = this.orbitControls = new OrbitControls(camera, this.renderer.renderer.domElement);
    // this.orbitControls.target.set(0, 10, 0)
    // orbitControls.enableZoom = false;
    // orbitControls.enablePan = false;
    // orbitControls.rotateSpeed = -0.25;
    // orbitControls.enableDamping = true;

  }

  render = () => {
    let delta = clock.getDelta();
    this.renderer && this.renderer.render();
    this.updatePhysicsUniverse(delta);
    requestAnimationFrame(this.render)
  }

  updatePhysicsUniverse(delta: number) {
    if (!this.physicsUniverse) return;
    // physics
    this.physicsUniverse.stepSimulation(delta, 10);
    // graphics
    let tmpTransformation: Ammo.btTransform = new Ammo.btTransform();

    for (let i = 0; i < this.meshList.length; i++) {
      let mesh = this.meshList[i];
      let physicsBody = mesh.userData.physicsBody as Ammo.btRigidBody;

      let motionState = physicsBody.getMotionState();
      if (motionState) {
        motionState.getWorldTransform(tmpTransformation);
        let newPos = tmpTransformation.getOrigin();
        let newQua = tmpTransformation.getRotation();
        mesh.position.set(newPos.x(), newPos.y(), newPos.z());
        mesh.quaternion.set(newQua.x(), newQua.y(), newQua.z(), newQua.w())
      }


    }

  }


  initEvent() {
    let { perspectiveCamera } = this.camera;
    let { renderer } = this.renderer;
    window.addEventListener('resize', () => {


      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
      perspectiveCamera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight)
    })




  }


}

