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
  particles: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {

    let boxGeometry1 = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16);
    boxGeometry1.deleteAttribute('normal');
    boxGeometry1.deleteAttribute('uv');

    let boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry1);

    const positionAttribute = boxGeometry.getAttribute('position');

    const colors = [];
    const sizes = [];
    const PARTICLE_SIZE = 20;

    const color = new THREE.Color();

    for (let i = 0, l = positionAttribute.count; i < l; i++) {

      color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
      color.toArray(colors, i * 3);

      sizes[i] = PARTICLE_SIZE * 0.5;

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({

      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: new THREE.TextureLoader().load('/static/assets/textures/sprites/disc.png') },
        alphaTest: { value: 0.9 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader

    });

    //

    let particles = this.particles = new THREE.Points(geometry, material);
    this.scene.add(particles);


  }




}


