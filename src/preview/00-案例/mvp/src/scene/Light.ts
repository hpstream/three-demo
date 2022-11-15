import * as THREE from 'three';

export default class Light {
  shadowLight: THREE.DirectionalLight;
  shadowTarget: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  ambientLight: THREE.AmbientLight;
  constructor() {
    // this.instances = {}
  }

  init() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.ambientLight = ambientLight;
    const shadowLight = this.shadowLight = new THREE.DirectionalLight(0xffffff, 1)
    shadowLight.position.set(5, 5, 5)
    shadowLight.castShadow = true
    var basicMaterial = new THREE.MeshStandardMaterial()
    let shadowTarget = this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), basicMaterial)
    // shadowTarget.material.side = THREE.DoubleSide;
    shadowTarget.position.set(0, -1, 0)
    shadowTarget.rotation.set(-Math.PI / 2, 0, 0)
    shadowTarget.receiveShadow = true;
    this.shadowTarget.visible = true;

    this.shadowTarget.name = 'shadowTarget'
    shadowLight.target = this.shadowTarget

    // 设置阴影贴图模糊度
    shadowLight.shadow.radius = 20;
    // 设置阴影贴图的分辨率
    shadowLight.shadow.mapSize.set(4096, 4096);
    // console.log(directionalLight.shadow);

    // 设置平行光投射相机的属性
    shadowLight.shadow.camera.near = 0.5;
    shadowLight.shadow.camera.far = 500;
    shadowLight.shadow.camera.top = 2;
    shadowLight.shadow.camera.bottom = -2;
    shadowLight.shadow.camera.left = -2;
    shadowLight.shadow.camera.right = 2;




    // this.instances.ambientLight = ambientLight
    // this.instances.shadowLight = shadowLight
    // this.instances.shadowTarget = this.shadowTarget
  }



  reset() {
    this.shadowLight.position.set(10, 30, 20)
    this.shadowTarget.position.set(0, 0, 0)
  }
}