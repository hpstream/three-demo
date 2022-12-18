import * as THREE from "three";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>;
  meterial: THREE.PointsMaterial;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    // geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      vertices.push(x, y, z); // 3*length
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const texture = new THREE.TextureLoader().load('/static/assets/textures/sprites/circle.png')

    // material
    const meterial = this.meterial = new THREE.PointsMaterial({
      alphaTest: 0.5,
      transparent: true,
      size: 50,
      sizeAttenuation: true,
      map: texture
    });

    const particles = new THREE.Points(geometry, meterial);
    this.scene.add(particles)
  }


  initFloor() {

  }

}


