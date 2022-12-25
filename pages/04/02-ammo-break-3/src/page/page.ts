
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
import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker.js'
import { Clock } from 'three';
import { convertToObject } from 'typescript';


let clock = new Clock();

// - Global variables -
var DISABLE_DEACTIVATION = 4;

var ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1);

var materialDynamic = new THREE.MeshPhongMaterial({ color: 0xfca400 });
var materialStatic = new THREE.MeshPhongMaterial({ color: 0x999999 });
var materialInteractive = new THREE.MeshPhongMaterial({ color: 0x990000 });

var physicsWorld: Ammo.btDiscreteDynamicsWorld;
var tmpTransformation: Ammo.btTransform;
let rigidBodies: THREE.Mesh[] = []
let firction = 0.05;
let margin = 0.05;

// Graphics variables
let speedometer = document.getElementById('speedometer');
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

// 可击碎的全局变量
let convexObjectbreaker = new ConvexObjectBreaker();

let impackPiont = new THREE.Vector3();

let impactNomal = new THREE.Vector3();

const objectsToRemove = [];
let index = -1;

for (let i = 0; i < 500; i++) {
  objectsToRemove[i] = null;

}
let numObjectsToRemove = 0;
const impactPoint = new THREE.Vector3();
const impactNormal = new THREE.Vector3();

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
    let dispatcher = this.dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
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
    this.buildFromMesh(ground, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0))

    // 塔1
    const tower1 = new THREE.Mesh(new THREE.BoxGeometry(4, 10, 4), new THREE.MeshPhongMaterial({ color: 0xb02014 }));

    tower1.name = '塔1';
    tower1.position.set(-8, 5, 0);
    tower1.receiveShadow = true;
    tower1.castShadow = true;
    this.scene.scene.add(tower1);
    this.buildFromMesh(tower1, 1000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true)

    // 塔2
    const tower2 = new THREE.Mesh(new THREE.BoxGeometry(4, 10, 4), new THREE.MeshPhongMaterial({ color: 0xb02014 }));


    tower2.name = '塔2';
    tower2.position.set(8, 5, 0);
    tower2.receiveShadow = true;
    tower2.castShadow = true;
    this.scene.scene.add(tower2);
    this.buildFromMesh(tower2, 1000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true)

    //桥
    const birdge = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 3), new THREE.MeshPhongMaterial({ color: 0xB3b865 }))
    birdge.name = '桥';
    birdge.position.set(0, 10.2, 0);
    birdge.receiveShadow = true;
    birdge.castShadow = true;
    this.scene.scene.add(birdge);
    this.buildFromMesh(birdge, 100, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true)

    // 石板
    for (let i = 0; i < 8; i++) {
      const stone = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 0.3), new THREE.MeshPhongMaterial({ color: 0xb0b0b0 }));
      stone.position.set(0, 2, 15 * (0.5 - i / 9));
      stone.name = '石板' + i;
      stone.castShadow = true;
      stone.receiveShadow = true;
      this.scene.scene.add(stone);
      this.buildFromMesh(stone, 120, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true)
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
    this.buildFromMesh(hill, 860, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true)
  }
  createConVexHullPhysicsShape(coords) {

    const btShape = new Ammo.btConvexHullShape();
    const tempVec3 = new Ammo.btVector3(0, 0, 0);
    for (let i = 0, il = coords.length; i < il; i += 3) {
      tempVec3.setValue(coords[i], coords[i + 1], coords[i + 2]);
      const lastOne = i >= (il - 3);
      btShape.addPoint(tempVec3, lastOne);
      btShape.addPoint(tempVec3, lastOne);

    }
    return btShape;

  }
  buildFromMesh(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>, mass: number, vel: THREE.Vector3, angVel: THREE.Vector3, isBreakable?: Boolean) {
    console.log('\n buildFromMesh');
    console.log(mesh);
    console.log('mesh = ' + mass);
    console.log('\n buildFromMesh');
    console.log(vel);
    console.log(angVel);
    console.log(isBreakable);

    let btShape: Ammo.btBoxShape;
    if (isBreakable) {
      // mesh.userData.mass ,velocity/angularVelocity,breakAble;
      convexObjectbreaker.prepareBreakableObject(mesh, mass, vel, angVel, true);
      btShape = this.createConVexHullPhysicsShape(mesh.geometry.attributes.position.array)
    } else {
      if (mesh.geometry instanceof THREE.SphereGeometry) {
        mesh.geometry.computeBoundingSphere();
        btShape = new Ammo.btSphereShape(mesh.geometry.boundingSphere.radius);

      } else {
        mesh.geometry.computeBoundingBox();
        let sx = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
        let sy = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
        let sz = mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z;
        btShape = new Ammo.btBoxShape(new Ammo.btVector3(sx / 2, sy / 2, sz / 2));
      }

    }

    const rigidBody = this.createRigidBody(btShape, mesh.position, mesh.quaternion, mass);

    rigidBody.setFriction(firction);

    rigidBody.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z));
    rigidBody.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z));

    this.buildRelation(mesh, rigidBody, mass);




  }
  buildRelation(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>, rigidBody: Ammo.btRigidBody, mass: number) {
    mesh.userData.physicsBody = rigidBody;
    const btVecUserData = new Ammo.btVector3(0, 0, 0);
    btVecUserData.threeObject = mesh;
    rigidBody.setUserPointer(btVecUserData)
    // 全局容器
    if (mass > 0) {
      rigidBodies.push(mesh);
      rigidBody.setActivationState(4);
    }
    physicsWorld.addRigidBody(rigidBody)
  }
  createRigidBody(btShape: Ammo.btBoxShape, position: THREE.Vector3, quaternion: THREE.Quaternion, mass: number): Ammo.btRigidBody {
    const btLocalInertia = new Ammo.btVector3(0, 0, 0);
    btShape.setMargin(margin);
    btShape.calculateLocalInertia(mass, btLocalInertia);

    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
    var motionState = new Ammo.btDefaultMotionState(transform);


    // 刚体
    var rigidBodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, btShape, btLocalInertia);
    return new Ammo.btRigidBody(rigidBodyInfo);

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

    this.updatePhysics(delta);

    this.orbitControls && this.orbitControls.update();

    requestAnimationFrame(this.render)
  }
  updatePhysics(delta: number) {
    index++;
    physicsWorld && physicsWorld.stepSimulation(delta, 10);
    // 更新mesh话位置
    for (var i = 0; i < rigidBodies.length; i++) {
      let mesh = rigidBodies[i];
      const physics = mesh.userData.physicsBody as Ammo.btRigidBody;
      const motionState = physics.getMotionState();

      if (motionState) {
        motionState.getWorldTransform(tmpTransformation);
        const p = tmpTransformation.getOrigin();
        const q = tmpTransformation.getRotation();
        mesh.position.set(p.x(), p.y(), p.z());
        mesh.quaternion.set(q.x(), q.y(), q.z(), q.w())
      }
    }

    // 处理碰撞;
    let dispatcher = this.dispatcher;
    if (!dispatcher) return;
    for (let i = 0, il = dispatcher.getNumManifolds(); i < il; i++) { // 所有的接触面

      const contactManifold = dispatcher.getManifoldByIndexInternal(i);
      const rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
      const rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);

      const threeObject0 = Ammo.castObject(rb0.getUserPointer(), Ammo.btVector3).threeObject;
      const threeObject1 = Ammo.castObject(rb1.getUserPointer(), Ammo.btVector3).threeObject;

      if (!threeObject0 && !threeObject1) {

        continue;

      }

      const userData0 = threeObject0 ? threeObject0.userData : null;
      const userData1 = threeObject1 ? threeObject1.userData : null;

      const breakable0 = userData0 ? userData0.breakable : false;
      const breakable1 = userData1 ? userData1.breakable : false;

      const collided0 = userData0 ? userData0.collided : false;
      const collided1 = userData1 ? userData1.collided : false;

      if ((!breakable0 && !breakable1) || (collided0 && collided1)) {

        continue;

      }
      // 找到一个接触最大的点
      let contact = false;
      let maxImpulse = 0;
      for (let j = 0, jl = contactManifold.getNumContacts(); j < jl; j++) {

        const contactPoint = contactManifold.getContactPoint(j);
        // 如果距离已经小于0
        if (contactPoint.getDistance() < 0) {

          contact = true;
          const impulse = contactPoint.getAppliedImpulse();

          if (impulse > maxImpulse) {

            maxImpulse = impulse;
            const pos = contactPoint.get_m_positionWorldOnB();
            const normal = contactPoint.get_m_normalWorldOnB();
            impactPoint.set(pos.x(), pos.y(), pos.z());
            impactNormal.set(normal.x(), normal.y(), normal.z());

          }

          break;

        }

      }

      // If no point has contact, abort
      if (!contact) continue;

      // Subdivision

      const fractureImpulse = 250;

      //处理有接触，力度足够的情况，进行破碎操作
      if (breakable0 && !collided0 && maxImpulse > fractureImpulse) {
        // 破裂函数
        const debris = convexObjectbreaker.subdivideByImpact(threeObject0, impactPoint, impactNormal, 1, 2); //1.5
        // const debris = convexObjectbreaker.subdivideByImpact(threeObject0, impactPoint, impactNormal, 1, 2, 1.5); 

        const numObjects = debris.length;
        for (let j = 0; j < numObjects; j++) {

          const vel = rb0.getLinearVelocity();
          const angVel = rb0.getAngularVelocity();
          const fragment = debris[j] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>;
          fragment.name = fragment.name + '.' + index;
          fragment.userData.velocity.set(vel.x(), vel.y(), vel.z());
          fragment.userData.angularVelocity.set(angVel.x(), angVel.y(), angVel.z());
          this.scene.scene.add(fragment);

          this.buildFromMesh(fragment, fragment.userData.mass, fragment.userData.velocity, fragment.userData.angularVelocity, true);

        }

        objectsToRemove[numObjectsToRemove++] = threeObject0;
        // userData0.collided = true;

      }


      if (breakable1 && !collided1 && maxImpulse > fractureImpulse) {

        const debris = convexObjectbreaker.subdivideByImpact(threeObject1, impactPoint, impactNormal, 1, 2);
        // const debris = convexObjectbreaker.subdivideByImpact(threeObject1, impactPoint, impactNormal, 1, 2, 1.5);

        const numObjects = debris.length;
        for (let j = 0; j < numObjects; j++) {

          const vel = rb1.getLinearVelocity();
          const angVel = rb1.getAngularVelocity();
          const fragment = debris[j] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>;
          fragment.name = fragment.name + '.' + index;
          fragment.userData.velocity.set(vel.x(), vel.y(), vel.z());
          fragment.userData.angularVelocity.set(angVel.x(), angVel.y(), angVel.z());
          this.scene.scene.add(fragment)
          this.buildFromMesh(fragment, fragment.userData.mass, fragment.userData.velocity, fragment.userData.angularVelocity, true);

        }

        objectsToRemove[numObjectsToRemove++] = threeObject1;
        // userData1.collided = true;

      }


    }
    for (let i = 0; i < numObjectsToRemove; i++) {

      const mesh = objectsToRemove[i];
      const rigidBody = mesh.userData.physicsBody;
      this.scene.scene.remove(mesh);
      physicsWorld.removeRigidBody(rigidBody);

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


    window.addEventListener('pointerdown', (event) => {
      mouse.set(
        event.clientX / window.innerWidth * 2 - 1,
        -(event.clientY / window.innerHeight * 2 - 1)
      )

      raycaster.setFromCamera(mouse, this.camera.perspectiveCamera);

      // 炮弹
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 10), new THREE.MeshPhongMaterial({ color: 0x202020 }));
      ball.name = '球';
      ball.position.copy(raycaster.ray.origin);
      ball.receiveShadow = true;
      ball.castShadow = true;
      this.scene.scene.add(ball);
      const vel = new THREE.Vector3().copy(raycaster.ray.direction).multiplyScalar(24);
      // console.log(ball)
      this.buildFromMesh(ball, 35, vel, new THREE.Vector3(0, 0, 0), false)
    })


  }


}

