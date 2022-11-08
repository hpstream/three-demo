import * as THREE from "three";
import { AxesHelper } from "three";
import { scene } from "../scene";
import Scene from "../scene/Scene";



export class GamePage {
  callbacks: any;
  scene: Scene;
  now: number;
  lastFrameTime: number;

  constructor(callbacks: any) {
    this.callbacks = callbacks;
  }

  init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.style.width = canvas + 'px';
    canvas.style.height = canvas + 'px';
    this.scene = scene;
    this.scene.init(canvas);

    let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#fff' }))

    cube.position.set(5, 0, 0)
    this.scene.instance.add(cube);

    this.scene.instance.add(new AxesHelper(10))



    this.render();


  }
  render() {
    this.now = Date.now()
    const tickTime = this.now - this.lastFrameTime

    this.scene.render()

    this.lastFrameTime = Date.now()
    requestAnimationFrame(this.render.bind(this))
  }

  show() { }
  hide() {

  }
  restart() {

  }
}