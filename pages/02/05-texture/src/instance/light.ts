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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.125);
    directionalLight.position.set(0, 0, 1).normalize();
    this.scene.add(directionalLight);

    const pointLight = this.pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);

    pointLight.color.setHSL(Math.random(), 1, 0.5);
    this.scene.add(pointLight);

  }
}