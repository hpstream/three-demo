import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    let ambientLight = new THREE.AmbientLight(0x404040)
    this.scene.add(ambientLight)

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    this.scene.add(directionalLight)
  }
}