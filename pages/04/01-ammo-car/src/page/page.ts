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
  // Keybord actions
  actions: Record<string, Boolean> = {};
  keysActions = {
    "KeyW": 'acceleration',
    "KeyS": 'braking',
    "KeyA": 'left',
    "KeyD": 'right'
  };

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
      this.createObject();
      this.initEvent();

    })


  }
  createObject() {
    // 地板
    this.createBox(new THREE.Vector3(0, -0.5, 0), ZERO_QUATERNION, 500, 1, 500, 0, 2);

    // 斜坡
    var quaternion = new THREE.Quaternion(0, 0, 0, 1);
    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 18);
    this.createBox(new THREE.Vector3(0, -1.5, 0), quaternion, 8, 4, 10, 0, 1);


    var size = .75;
    var nw = 8;
    var nh = 8;
    for (var j = 0; j < nw; j++) {
      for (var i = 0; i < nh; i++) {
        this.createBox(new THREE.Vector3(size * j - (size * (nw - 1)) / 2, size * i, 10), ZERO_QUATERNION, size, size, size, 10);
      }

    }

    this.createVehicle(new THREE.Vector3(0, 4, -20), ZERO_QUATERNION);


  }
  createVehicle(pos: THREE.Vector3, quat: THREE.Quaternion) {
    // Vehicle contants

    var chassisWidth = 1.8; // 车宽
    var chassisHeight = .6;// 车高
    var chassisLength = 4; // 车长
    var massVehicle = 800; // 车质量

    var wheelAxisPositionBack = -1; // 后轮相对中间的位置
    var wheelRadiusBack = .4; //后轮半斤
    var wheelWidthBack = .3; //后轮髋
    var wheelHalfTrackBack = 1; // 两后轮距离
    var wheelAxisHeightBack = .3; //后轮轴的高度

    var wheelAxisFrontPosition = 1.7;
    var wheelHalfTrackFront = 1;
    var wheelAxisHeightFront = .3;
    var wheelRadiusFront = .35;
    var wheelWidthFront = .2;
    // 摩擦力
    var friction = 1000;
    var suspensionStiffness = 20.0; // 悬挂刚度
    var suspensionDamping = 2.3; // 悬挂放松
    var suspensionCompression = 4.4; // 悬挂压缩
    var suspensionRestLength = 0.6;
    var rollInfluence = 0.2;

    var steeringIncrement = .04;
    var steeringClamp = .5; // 转向锁止
    var maxEngineForce = 2000; // 最大推力
    var maxBreakingForce = 100; // 最大刹车


    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    var motionState = new Ammo.btDefaultMotionState(transform);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    // Chassis
    var boxShape = new Ammo.btBoxShape(new Ammo.btVector3(chassisWidth * .5, chassisHeight * .5, chassisLength * .5));
    boxShape.calculateLocalInertia(massVehicle, localInertia);

    var vehicleBody = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(massVehicle, motionState, boxShape, localInertia));
    vehicleBody.setActivationState(DISABLE_DEACTIVATION);
    physicsWorld.addRigidBody(vehicleBody);

    var chassisMesh = this.createVehicleMesh(chassisWidth, chassisHeight, chassisLength);

    // Raycast Vehicle
    var engineForce = 0;
    var vehicleSteering = 0;
    var breakingForce = 0;
    var tuning = new Ammo.btVehicleTuning();
    var rayCaster = new Ammo.btDefaultVehicleRaycaster(physicsWorld);
    var vehicle = new Ammo.btRaycastVehicle(tuning, vehicleBody, rayCaster);
    vehicle.setCoordinateSystem(0, 1, 2);
    physicsWorld.addAction(vehicle);

    // Wheels
    var FRONT_LEFT = 0;
    var FRONT_RIGHT = 1;
    var BACK_LEFT = 2;
    var BACK_RIGHT = 3;
    var wheelMeshes = [];
    var wheelDirectionCS0 = new Ammo.btVector3(0, -1, 0);
    var wheelAxleCS = new Ammo.btVector3(-1, 0, 0);
    let addWheel = (isFront, pos, radius, width, index) => {

      var wheelInfo = vehicle.addWheel(
        pos,
        wheelDirectionCS0,
        wheelAxleCS,
        suspensionRestLength,
        radius,
        tuning,
        isFront);

      wheelInfo.set_m_suspensionStiffness(suspensionStiffness);
      wheelInfo.set_m_wheelsDampingRelaxation(suspensionDamping);
      wheelInfo.set_m_wheelsDampingCompression(suspensionCompression);
      wheelInfo.set_m_frictionSlip(friction);
      wheelInfo.set_m_rollInfluence(rollInfluence);

      wheelMeshes[index] = this.createWheelMesh(radius, width);

    }
    addWheel(true, new Ammo.btVector3(wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition), wheelRadiusFront, wheelWidthFront, FRONT_LEFT);
    addWheel(true, new Ammo.btVector3(-wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition), wheelRadiusFront, wheelWidthFront, FRONT_RIGHT);
    addWheel(false, new Ammo.btVector3(-wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack), wheelRadiusBack, wheelWidthBack, BACK_LEFT);
    addWheel(false, new Ammo.btVector3(wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack), wheelRadiusBack, wheelWidthBack, BACK_RIGHT);

    // Sync keybord actions and physics and graphics
    let sync = (dt) => {

      var speed = vehicle.getCurrentSpeedKmHour();

      speedometer.innerHTML = (speed < 0 ? '(R) ' : '') + Math.abs(speed).toFixed(1) + ' km/h';

      breakingForce = 0;
      engineForce = 0;
      console.log(this.actions)

      if (this.actions.acceleration) {
        if (speed < -1)
          breakingForce = maxBreakingForce;
        else engineForce = maxEngineForce;
      }
      if (this.actions.braking) {
        if (speed > 1)
          breakingForce = maxBreakingForce;
        else engineForce = -maxEngineForce / 2;
      }
      if (this.actions.left) {
        if (vehicleSteering < steeringClamp)
          vehicleSteering += steeringIncrement;
      }
      else {
        if (this.actions.right) {
          if (vehicleSteering > -steeringClamp)
            vehicleSteering -= steeringIncrement;
        }
        else {
          if (vehicleSteering < -steeringIncrement)
            vehicleSteering += steeringIncrement;
          else {
            if (vehicleSteering > steeringIncrement)
              vehicleSteering -= steeringIncrement;
            else {
              vehicleSteering = 0;
            }
          }
        }
      }

      vehicle.applyEngineForce(engineForce, BACK_LEFT);
      vehicle.applyEngineForce(engineForce, BACK_RIGHT);

      vehicle.setBrake(breakingForce / 2, FRONT_LEFT);
      vehicle.setBrake(breakingForce / 2, FRONT_RIGHT);
      vehicle.setBrake(breakingForce, BACK_LEFT); //左后
      vehicle.setBrake(breakingForce, BACK_RIGHT); //右后

      vehicle.setSteeringValue(vehicleSteering, FRONT_LEFT); //左前
      vehicle.setSteeringValue(vehicleSteering, FRONT_RIGHT); //右前

      var tm, p, q, i;
      var n = vehicle.getNumWheels();
      for (i = 0; i < n; i++) {
        vehicle.updateWheelTransform(i, true);
        tm = vehicle.getWheelTransformWS(i);
        p = tm.getOrigin();
        q = tm.getRotation();
        wheelMeshes[i].position.set(p.x(), p.y(), p.z());
        wheelMeshes[i].quaternion.set(q.x(), q.y(), q.z(), q.w());
      }

      tm = vehicle.getChassisWorldTransform();
      p = tm.getOrigin();
      q = tm.getRotation();
      chassisMesh.position.set(p.x(), p.y(), p.z());
      chassisMesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
    }

    this.syncList.push(sync);
  }
  // 轮子
  createWheelMesh(radius: number, width: number) {
    var t = new THREE.CylinderGeometry(radius, radius, width, 24, 1);
    t.rotateZ(Math.PI / 2);
    var mesh = new THREE.Mesh(t, materialInteractive);
    mesh.add(new THREE.Mesh(new THREE.BoxGeometry(width * 1.5, radius * 1.75, radius * .25, 1, 1, 1), materialInteractive));
    this.scene.scene.add(mesh);
    return mesh;
  }
  //车架
  createVehicleMesh(w: number, l: number, h: number) {
    var shape = new THREE.BoxGeometry(w, l, h, 1, 1, 1);
    var mesh = new THREE.Mesh(shape, materialInteractive);
    this.scene.scene.add(mesh);
    return mesh;
  }
  createBox(pos: THREE.Vector3, quat: THREE.Quaternion, w: number, l: number, h: number, mass: number, friction?: number) {
    if (!mass) mass = 0;
    if (!friction) friction = 1;

    var material = mass > 0 ? materialDynamic : materialStatic;
    var shape = new THREE.BoxGeometry(w, l, h, 1, 1, 1);

    var mesh = new THREE.Mesh(shape, material);
    mesh.position.copy(pos);
    mesh.quaternion.copy(quat);
    this.scene.scene.add(mesh);


    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    var motionState = new Ammo.btDefaultMotionState(transform);

    // 碰撞几何体
    var boxShape = new Ammo.btBoxShape(new Ammo.btVector3(w
      / 2, l / 2, h / 2));

    var localInertia = new Ammo.btVector3(0, 0, 0);
    boxShape.calculateLocalInertia(mass, localInertia);

    // 刚体
    var rigidBodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, boxShape, localInertia);

    var rigidBody = new Ammo.btRigidBody(rigidBodyInfo);

    rigidBody.setFriction(friction);

    physicsWorld.addRigidBody(rigidBody);

    if (mass > 0) {
      rigidBody.setActivationState(4); // 4
      // Sync physics and graphics
      function sync(dt) {
        var ms = rigidBody.getMotionState();
        if (ms) {
          ms.getWorldTransform(tmpTransformation);
          var p = tmpTransformation.getOrigin();
          var q = tmpTransformation.getRotation();
          mesh.position.set(p.x(), p.y(), p.z());
          mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
      }

      this.syncList.push(sync);
    }

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


    window.addEventListener('keydown', (e) => {
      if (this.keysActions[e.code]) {
        this.actions[this.keysActions[e.code]] = true;
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    })

    window.addEventListener('keyup', (e) => {
      if (this.keysActions[e.code]) {
        this.actions[this.keysActions[e.code]] = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    })



  }


}

