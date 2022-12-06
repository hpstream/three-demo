import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as THREE from "three";

import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader.js";


// import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  spheres: (THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>)[];
  css2DRenderer: CSS2DRenderer;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    // 1.环形extrude
    const closedSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-60, -100, 60), // 左下
      new THREE.Vector3(-60, 20, 60),//左中
      new THREE.Vector3(-60, 120, 60),//左上
      // new THREE.Vector3(60, 120, -60),// 右上
      new THREE.Vector3(60, 20, -60),// 右中
      new THREE.Vector3(60, -100, -60) //右下
    ]);

    closedSpline.curveType = 'catmullrom';
    closedSpline.closed = true;
    // 2.extrude settings
    const extrudeSettings = {
      steps: 100,
      bevelEnabled: false,
      extrudePath: closedSpline
    }
    // shape
    const r = 20;
    let pts1 = [], count = 3;

    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      pts1.push(new THREE.Vector2(r * Math.cos(a), r * Math.sin(a)))

    }

    const shaper1 = new THREE.Shape(pts1);
    const geometry1 = new THREE.ExtrudeGeometry(shaper1, extrudeSettings)
    const material1 = new THREE.MeshLambertMaterial({
      color: 0xb00000
    })

    const mesh1 = new THREE.Mesh(geometry1, material1)

    this.scene.add(mesh1)

    //======
    const randomPoints = [];
    count = 10;

    for (let i = 0; i < count; i++) {
      randomPoints.push(
        new THREE.Vector3((i - 4.5) * 50,
          THREE.MathUtils.randFloat(-50, 50),
          THREE.MathUtils.randFloat(-50, 50))
      )
    }
    const randomSpline = new THREE.CatmullRomCurve3(randomPoints);

    const extrudeSettings2 = {
      steps: 200,
      bevelEnabled: false,
      extrudePath: randomSpline
    }

    // shape
    const pts2 = [], numPts = 5;

    for (let i = 0; i < numPts * 2; i++) {

      const l = i % 2 == 1 ? 10 : 20;

      const a = i / numPts * Math.PI;
      pts2.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));

    }


    const shape2 = new THREE.Shape(pts2);
    const geometry2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings2);

    const material2 = new THREE.MeshLambertMaterial({
      color: 0xff8000
    })

    const mesh2 = new THREE.Mesh(geometry2, material2);
    this.scene.add(mesh2)


    const materials = [material1, material2];

    const extrudeSettings3 = {
      depth: 20,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 4,
      bevelSegments: 1
    };

    const geometry3 = new THREE.ExtrudeGeometry(shape2, extrudeSettings3);

    const mesh3 = new THREE.Mesh(geometry3, materials);

    mesh3.position.set(50, 100, 50);

    this.scene.add(mesh3);







  }


  one() {


  }

  initCube() {

  }
}


