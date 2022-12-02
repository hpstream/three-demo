import * as THREE from "three";
import { Texture, _SRGBAFormat } from "three";
export default class Scene {
  scene: THREE.Scene;

  constructor() {
    let scene = this.scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x888888);
    const urls = [
      '/static/assets/textures/cube/pisa/px.png',
      '/static/assets/textures/cube/pisa/nx.png',
      '/static/assets/textures/cube/pisa/py.png',
      '/static/assets/textures/cube/pisa/ny.png',
      '/static/assets/textures/cube/pisa/pz.png',
      '/static/assets/textures/cube/pisa/nz.png'
    ]
    let textureCube = new THREE.CubeTextureLoader().load(urls);
    scene.background = textureCube;
    scene.environment = textureCube;
  }
}