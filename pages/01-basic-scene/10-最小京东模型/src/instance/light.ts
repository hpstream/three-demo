import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    const hemiLight = this.hemiLight = new THREE.HemisphereLight();
    hemiLight.intensity = 0.3;
    let dirLight = this.dirLight = new THREE.DirectionalLight();
    dirLight.castShadow = true;
    dirLight.position.set(5, 5, 5);
    this.scene.add(hemiLight);
    this.scene.add(dirLight);
  }
}