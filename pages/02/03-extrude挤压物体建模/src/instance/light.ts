import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  pointLight: THREE.PointLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {

    const ambientLight = new THREE.AmbientLight(0x222222);

    this.scene.add(ambientLight);

    const pointLight = this.pointLight = new THREE.PointLight(0xffffff);
    // light.position.set();
    this.scene.add(pointLight);

  }
}