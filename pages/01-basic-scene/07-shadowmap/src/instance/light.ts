import * as THREE from "three";
export default class Light {
  hemiLight: THREE.HemisphereLight;//半球光
  dirLight: THREE.DirectionalLight;// 平行光
  spotLight: THREE.SpotLight; // 聚光灯
  ambientLight: THREE.AmbientLight;// 环境光
  constructor(public scene: THREE.Scene) {
    this.init();

  }

  // 环境光不产生投影
  init() {
    const ambientLight = this.ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
    let spotLight = this.spotLight = new THREE.SpotLight(0xffffff, 1.0);
    spotLight.name = 'Spot Light';
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3; //聚光锥的半影衰减百分比。在0和1之间的值。默认为0

    spotLight.position.set(10, 10, 5);
    this.scene.add(spotLight);
    // 相机帮助器
    spotLight.shadow.camera.near = 8;
    spotLight.shadow.camera.far = 30;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    this.scene.add(new THREE.CameraHelper(spotLight.shadow.camera))

    // 平行光
    let dirLight = this.dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.name = 'Dir light';
    dirLight.castShadow = true;
    dirLight.position.set(0, 10, 0);
    this.scene.add(dirLight);
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;


    this.scene.add(new THREE.CameraHelper(dirLight.shadow.camera))

  }
}