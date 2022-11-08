import * as THREE from 'three';

export default class Light {
  shadowLight: THREE.DirectionalLight;
  shadowTarget: THREE.Mesh;
  ambientLight: THREE.AmbientLight;
  constructor() {
    // this.instances = {}
  }

  init() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.ambientLight = ambientLight;
    const shadowLight = this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.3)
    shadowLight.position.set(10, 30, 20)
    shadowLight.castShadow = true
    var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xF5f5f5 })
    this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), basicMaterial)
    this.shadowTarget.visible = false
    this.shadowTarget.name = 'shadowTarget'
    shadowLight.target = this.shadowTarget
    shadowLight.shadow.camera.near = 0.5
    shadowLight.shadow.camera.far = 500
    shadowLight.shadow.camera.left = -100
    shadowLight.shadow.camera.right = 100
    shadowLight.shadow.camera.bottom = -100
    shadowLight.shadow.camera.top = 100
    shadowLight.shadow.mapSize.width = 1024
    shadowLight.shadow.mapSize.height = 1024

    // this.instances.ambientLight = ambientLight
    // this.instances.shadowLight = shadowLight
    // this.instances.shadowTarget = this.shadowTarget
  }



  reset() {
    this.shadowLight.position.set(10, 30, 20)
    this.shadowTarget.position.set(0, 0, 0)
  }
}