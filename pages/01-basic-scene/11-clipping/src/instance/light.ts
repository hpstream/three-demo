import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;
  dirLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
  spotLight: THREE.SpotLight;
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    const ambientLight = this.ambientLight = new THREE.AmbientLight(0x505050);
    this.scene.add(ambientLight);
    const spotLight = this.spotLight = new THREE.SpotLight(0xffffff);
    spotLight.angle = Math.PI / 5;
    spotLight.castShadow = true;
    spotLight.penumbra = 0.3;
    spotLight.position.set(2, 3, 3);
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    this.scene.add(spotLight);


    let dirLight = this.dirLight = new THREE.DirectionalLight(0x55505a, 1);
    dirLight.castShadow = true;
    dirLight.position.set(0, 3, 0);
    dirLight.shadow.camera.near = 3;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.left = 1;
    dirLight.shadow.camera.right = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);
  }
}