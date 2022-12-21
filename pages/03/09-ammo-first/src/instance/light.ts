import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.2)
    this.scene.add(ambientLight)

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 0.9, 0.4);
    this.scene.add(directionalLight)
  }
}