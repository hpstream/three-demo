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
    this.initFloor();

    let css2DRenderer = this.css2DRenderer = new CSS2DRenderer();
    css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    css2DRenderer.domElement.style.position = 'absolute';
    css2DRenderer.domElement.style.top = '0px';
    css2DRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(css2DRenderer.domElement);
  }


  initFloor() {
    const loader = new PDBLoader();
    loader.load('/static/assets/models/pdb/caffeine.pdb', (pdb) => {
      //geometryAtoms: colors[24], position[24]: 原子模型的颜色和位置
      //geometryBonds： position[50]， 25对化学键
      // json actoms[24], 0-2:位置信息；3:颜色，4:label标签；
      // console.log(pdb)
      let positions = pdb.geometryAtoms.getAttribute('position');
      const colors = pdb.geometryAtoms.getAttribute('color');

      const position = new THREE.Vector3();
      const color = new THREE.Color();

      for (let i = 0; i < positions.count; i++) {
        position.x = positions.getX(i);
        position.y = positions.getY(i);
        position.z = positions.getZ(i);
        color.r = colors.getX(i);
        color.g = colors.getY(i);
        color.b = colors.getZ(i);

        const geometry = new THREE.IcosahedronGeometry(0.25, 3);
        const material = new THREE.MeshPhongMaterial({ color: color });

        const object = new THREE.Mesh(geometry, material);
        object.position.copy(position);
        this.scene.add(object)
      }

      positions = pdb.geometryBonds.getAttribute('position');
      const start = new THREE.Vector3();
      const end = new THREE.Vector3();

      for (let i = 0; i < positions.count; i += 2) {
        start.x = positions.getX(i);
        start.y = positions.getY(i);
        start.z = positions.getZ(i);

        end.x = positions.getX(i + 1);
        end.y = positions.getY(i + 1);
        end.z = positions.getZ(i + 1);

        // mesh

        const geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff
        })

        const object = new THREE.Mesh(geometry, material);
        object.position.copy(start);
        object.position.lerp(end, 0.5);
        object.scale.z = start.distanceTo(end) * 10;
        object.lookAt(end);
        this.scene.add(object)
      }
      let json = pdb.json;

      for (let i = 0; i < json.atoms.length; i++) {
        let atom = json.atoms[i]
        console.log(atom)
        const text = document.createElement('div');
        text.style.color = `rgb(${atom[3][0]},${atom[3][1]},${atom[3][2]})`;
        text.textContent = atom[4];
        const label = new CSS2DObject(text);
        position.x = atom[0];
        position.y = atom[1];
        position.z = atom[2];
        label.position.copy(position);
        this.scene.add(label);
      }

    })

  }

  initCube() {

  }
}


