import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  spotLight: THREE.SpotLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    const hemiLight = this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.intensity = 0.1;
    this.scene.add(hemiLight);

    let dirLight = this.dirLight = new THREE.DirectionalLight(0xffffff, 1);

    dirLight.position.set(-3, 10, -10);
    dirLight.castShadow = true;
    this.scene.add(dirLight)
  }
}