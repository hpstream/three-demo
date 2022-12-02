import * as THREE from "three";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  spheres: (THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>)[];

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    const geometry = new THREE.SphereGeometry(0.1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      // color: 0xffffff,
      // aoMapIntensity: 1,
      metalness: 1, // 材质与金属的相似度。非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观
      roughness: 0, // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0
      // envMap: this.scene.background as THREE.Texture
    })

    let spheres = this.spheres = [];

    for (let i = 0; i < 500; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = Math.random() * 10 - 5; // -5 ~ 5
      mesh.position.y = Math.random() * 10 - 5; // -5 ~ 
      mesh.position.z = Math.random() * 10 - 5; // -5 ~ 5
      let scaleValue = Math.random() * 3 + 1;
      mesh.scale.set(scaleValue, scaleValue, scaleValue);
      spheres.push(mesh)
      this.scene.add(mesh)

    }
  }


  initFloor() {

  }

  initCube() {

  }
}


