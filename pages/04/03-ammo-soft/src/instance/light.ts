import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    let ambientLight = new THREE.AmbientLight(0x707070, 1)
    this.scene.add(ambientLight)

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-10, 18, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -14;
    directionalLight.shadow.camera.right = 14;
    directionalLight.shadow.camera.top = 14;
    directionalLight.shadow.camera.bottom = -14;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.near = 2;
    // this.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))
    this.scene.add(directionalLight)
  }
}