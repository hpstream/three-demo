import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    const hemiLight = this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0)
    this.scene.add(hemiLight);


    let dirLight = this.dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.castShadow = true;
    dirLight.position.set(0, 20, 10);
    this.scene.add(dirLight);
  }
}