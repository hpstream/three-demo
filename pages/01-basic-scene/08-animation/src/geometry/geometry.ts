import * as THREE from "three";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  mixer: THREE.AnimationMixer;

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
    cube.material.transparent = true;
    // cube.material.opacity = 0.3;
    cube.position.set(0, 0, 0);

    this.scene.add(cube)
    this.initAnimation();
  }
  initAnimation() {

    // BooleanKeyframeTrack
    // ColorKeyframeTrack
    // NumberKeyframeTrack
    // QuaternionKeyframeTrack
    // StringKeyframeTrack
    // VectorKeyframeTrack
    // 位置
    const positionKF = new THREE.VectorKeyframeTrack('.position',
      [0, 1, 2, 3],
      [
        0, 0, 0, 0,
        10, 10, 0, 0,
        10, 0, 0, 0,
        0, 0, 0, 0
      ]);

    const scaleKF = new THREE.VectorKeyframeTrack('.scale',
      [0, 1, 2, 3],
      [
        1, 1, 1, 0,
        2, 2, 2, 0,
        0.5, 2, 2, 0,
        1, 1, 1, 0
      ]);

    const xAxis = new THREE.Vector3(1, 0, 0);
    const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0)
    const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI)
    const quaternionKF = new THREE.VectorKeyframeTrack('.quaternion',
      [0, 1, 2, 3],
      [
        qInitial.x, qInitial.y, qInitial.z, qInitial.w,
        qFinal.x, qFinal.y, qFinal.z, qFinal.w,
        qInitial.x, qInitial.y, qInitial.z, qInitial.w,
        qFinal.x, qFinal.y, qFinal.z, qFinal.w,
      ]);

    let colorKf = new THREE.ColorKeyframeTrack('.material.color', [0, 1, 2, 3], [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 0
    ])

    let opacityKf = new THREE.NumberKeyframeTrack('.material.opacity', [0, 1, 2, 3], [1, 0.1, 0.6, 1])
    let clip = new THREE.AnimationClip('Action', 4, [positionKF, scaleKF, quaternionKF, colorKf, opacityKf]);

    let mixer = this.mixer = new THREE.AnimationMixer(this.cube);
    const clipAction = mixer.clipAction(clip);
    clipAction.play();
  }
}


