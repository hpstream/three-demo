import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { GUI } from "dat.gui";
import fragmentShader from "./../shader/fragmentShader.glsl?raw";
import vertexShader from "./../shader/vertexShader.glsl?raw";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";


export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  meterial: THREE.PointsMaterial;
  water: Water;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  sky: Sky;
  shaderMaterial: THREE.ShaderMaterial;


  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {




  }




}


