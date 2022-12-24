// import Ammo = require('ammojs-typed');

import { Camera } from '../instance/camera';
import config from '../config/config'
import Light from '../instance/light';
import renderer from '../instance/renderer';
import Scene from '../instance/scene';
import Geometry from '../geometry/geometry';

import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Clock } from 'three';


let clock = new Clock();

// - Global variables -
var DISABLE_DEACTIVATION = 4;

var ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1);

var materialDynamic = new THREE.MeshPhongMaterial({ color: 0xfca400 });
var materialStatic = new THREE.MeshPhongMaterial({ color: 0x999999 });
var materialInteractive = new THREE.MeshPhongMaterial({ color: 0x990000 });

var physicsWorld: Ammo.btDiscreteDynamicsWorld;
var tmpTransformation: Ammo.btTransform;


// Graphics variables
let speedometer = document.getElementById('speedometer');


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

  constructor() {
    this.init()
    // 
  }
  init() {
    // 图形世界
    // 物理世界




    Ammo().then(() => {
      console.log(1)



      // Physics variables

      this.initGraphics();
      this.initPhysics();
      this.initObjects();
      this.initEvent();

    })


  }

  initPhysics() {
    // Physics configuration
    tmpTransformation = new Ammo.btTransform();
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    let broadphase = new Ammo.btDbvtBroadphase();
    let solver = new Ammo.btSequentialImpulseConstraintSolver();
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));
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
    // 地面
    const ground = new THREE.Mesh(new THREE.BoxGeometry(40, 1, 40), new THREE.MeshPhongMaterial({
      color: 0xffffff
    }))
    ground.name = '地面';
    ground.position.set(0, -0.5, 0);
    ground.receiveShadow = true;
    this.scene.scene.add(ground);

    // 塔1
    const tower1 = new THREE.Mesh(new THREE.BoxGeometry(4, 10, 4), new THREE.MeshPhongMaterial({ color: 0xb02014 }));

    tower1.name = '塔1';
    tower1.position.set(-8, 5, 0);
    tower1.receiveShadow = true;
    tower1.castShadow = true;
    this.scene.scene.add(tower1);

    // 塔1
    const tower2 = new THREE.Mesh(new THREE.BoxGeometry(4, 10, 4), new THREE.MeshPhongMaterial({ color: 0xb02014 }));

    tower2.name = '塔2';
    tower2.position.set(8, 5, 0);
    tower2.receiveShadow = true;
    tower2.castShadow = true;
    this.scene.scene.add(tower2);

    //桥
    const birdge = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 3), new THREE.MeshPhongMaterial({ color: 0xB3b865 }))
    birdge.name = '桥';
    birdge.position.set(0, 10.2, 0);
    birdge.receiveShadow = true;
    birdge.castShadow = true;
    this.scene.scene.add(birdge);

    // 石板
    for (let i = 0; i < 8; i++) {
      const stone = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 0.3), new THREE.MeshPhongMaterial({ color: 0xb0b0b0 }));
      stone.position.set(0, 2, 15 * (0.5 - i / 9));
      stone.name = '石板' + i;
      stone.castShadow = true;
      stone.receiveShadow = true;
      this.scene.scene.add(stone);
    }
    // 小山
    const hillPints = [];
    hillPints.push(new THREE.Vector3(4, -5, 4))
    hillPints.push(new THREE.Vector3(-4, -5, 4))
    hillPints.push(new THREE.Vector3(4, -5, -4))
    hillPints.push(new THREE.Vector3(-4, -5, -4))
    hillPints.push(new THREE.Vector3(0, 5, 0))

    const hill = new THREE.Mesh(new ConvexGeometry(hillPints), new THREE.MeshPhongMaterial({ color: 0xb03814 }))

    hill.name = '小山';
    hill.castShadow = true;
    hill.receiveShadow = true;
    hill.position.set(5, 2.5, -7);

    this.scene.scene.add(hill);


  }

  createHelpUtils() {
    let scene = this.scene.scene;
    let camera = this.camera.perspectiveCamera;
    scene.add(new THREE.AxesHelper(100))
    let orbitControls = this.orbitControls = new OrbitControls(camera, this.renderer.renderer.domElement);
    this.orbitControls.target.set(0, 2, 0);
    this.orbitControls.update();
    // orbitControls.enableZoom = false;
    // orbitControls.enablePan = false;
    // orbitControls.rotateSpeed = -0.25;
    // orbitControls.enableDamping = true;

  }

  render = () => {
    let delta = clock.getDelta();
    this.renderer && this.renderer.render();
    for (var i = 0; i < this.syncList.length; i++) {
      this.syncList[i](delta);
    }


    physicsWorld && physicsWorld.stepSimulation(delta, 10);
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



  }


}

