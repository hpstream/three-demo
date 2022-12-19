import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { GUI } from "dat.gui";
import fragmentShader from "./../shader/fragmentShader.glsl?raw";
import vertexShader from "./../shader/vertexShader.glsl?raw";

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

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff
    })

    // this.scene.add(new THREE.Mesh(geometry, material))

    // 1.uniforms 全局变量
    // 2.vertextShader; 定点着色器，定义位置信息
    // 3.fragmentShader; 片元着色器，定义颜色

    const shaderMaterial = this.shaderMaterial = new THREE.ShaderMaterial();

    shaderMaterial.uniforms.time = { value: 1.0 }

    shaderMaterial.vertexShader = vertexShader;

    shaderMaterial.fragmentShader = fragmentShader;


    this.scene.add(new THREE.Mesh(geometry, shaderMaterial))







  }




}


