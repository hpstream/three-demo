import * as THREE from 'three';
export default class Camera {
  instance: THREE.OrthographicCamera
  target: THREE.Vector3;
  frustumSize = 30
  constructor() {
    this.instance = null;
    this.target = new THREE.Vector3(0, 0, 0)
  }

  init() {
    const aspect = window.innerHeight / window.innerWidth
    this.instance = new THREE.OrthographicCamera(-this.frustumSize, this.frustumSize, this.frustumSize * aspect, -this.frustumSize * aspect, -100, 85)
    this.instance.position.set(-10, 10, 10)
    this.target = new THREE.Vector3(0, 0, 0)
    this.instance.lookAt(this.target)
  }


  reset() {
    this.instance.position.set(-10, 10, 10)
    this.target = new THREE.Vector3(0, 0, 0)
  }

}

