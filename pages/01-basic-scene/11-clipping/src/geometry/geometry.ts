import * as THREE from "three";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  material: THREE.MeshPhongMaterial;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(9, 9, 1, 1), new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150
    }))
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    this.scene.add(plane)

    let geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);
    let material = this.material = new THREE.MeshPhongMaterial({
      color: 0x80ee10,
      shininess: 100
    })

    this
    let object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    // object.position.set(3, 0, 3)
    this.scene.add(object)


    // clipping
    // let clip = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0.2);
    // let clip1 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.2);
    // let clip2 = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2);
    // let clip3 = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.2);
    // local clipping;
    material.side = THREE.DoubleSide;
    // material.clippingPlanes = [clip, clip1, clip2];
    material.clipShadows = true;



  }


  initFloor() {

  }

  initCube() {

  }
}


