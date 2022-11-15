
import * as THREE from "three";
export class GameOverPage {

  callbacks: any;
  canvas: HTMLCanvasElement;
  texture: THREE.Texture;
  material: THREE.MeshBasicMaterial;
  geometry: THREE.PlaneGeometry;
  obj: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  context: CanvasRenderingContext2D;
  constructor(callbacks: any) {
    this.callbacks = callbacks;
  }

  init(option: any) {
    this.gameOverCanvas(option);
  }
  gameOverCanvas(option: any) {
    let scene = option.scene as THREE.Scene;
    const aspect = window.innerHeight / window.innerWidth;
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.texture = new THREE.Texture(this.canvas);
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
    this.obj = new THREE.Mesh(this.geometry, this.material)
    this.obj.position.z = 1;
    this.obj.rotateY(Math.PI)
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#333';
    this.context.fillRect((window.innerWidth - 200) / 2, (window.innerHeight - 100) / 2, 200, 100);
    this.context.fillStyle = '#fff';
    this.context.font = '20px Georgia';
    this.context.fillText('Game Over', (window.innerWidth - 200) / 2 + 50, (window.innerHeight - 100) / 2 + 55)

    this.texture.needsUpdate = true;
    scene.add(this.obj)




  }
  hide() {

  }
  show() {

  }
}