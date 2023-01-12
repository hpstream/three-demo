import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as THREE from "three";

// import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader.js";

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  spheres: (THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>)[];
  css2DRenderer: CSS2DRenderer;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    this.initFloor();

    new MTLLoader()
      .load('/static/Minimal_Default.mtl', (materials) => {

        materials.preload();

        new OBJLoader()
          .setMaterials(materials)
          .load('/static/StaticMesh_UV1.OBJ', (object) => {
            console.log(object)
            console.log(materials)


            // object.position.y = - 95;
            object.position.set(0, 0, 0);


            object.scale.set(0.05, 0.05, 0.05)
            this.scene.add(object);

          }, () => { });

      });
  }


  initFloor() {


  }

  initCube() {

  }
}


