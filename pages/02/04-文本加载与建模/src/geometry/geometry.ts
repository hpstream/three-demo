
import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  spheres: (THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>)[];


  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ]

    const loader = new FontLoader();
    loader.load('/static/assets/fonts/helvetiker_bold.typeface.json', (font) => {
      // console.log(font);

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          opacity: 0.5,
          transparent: true
        }))
      plane.position.y = -10;
      plane.rotation.x = - Math.PI / 2;
      this.scene.add(plane)

      const geometry = new TextGeometry('hello world', {
        font: font,
        size: 50,
        height: 20,
        curveSegments: 20,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: true,
      });
      geometry.computeBoundingBox();
      const xOffset = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2;
      const textMesh1 = new THREE.Mesh(geometry, materials);
      textMesh1.position.set(-xOffset, 30, 0);
      this.scene.add(textMesh1)


      // 倒影
      const textMesh2 = new THREE.Mesh(geometry, materials);

      textMesh2.position.set(-xOffset, -30, 0);
      textMesh2.rotation.x = Math.PI;
      this.scene.add(textMesh2)


    })
  }


  one() {


  }

  initCube() {

  }
}


