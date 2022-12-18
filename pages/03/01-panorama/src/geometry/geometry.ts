import * as THREE from "three";

export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    // this.initFloor();
    this.initCube();
  }


  initFloor() {

  }
  getTexturesFromAtlasFile(flie: string, tilesNum: number) {
    const textures: THREE.Texture[] = [];
    for (let i = 0; i < tilesNum; i++) {
      textures[i] = new THREE.Texture();


    }
    new THREE.ImageLoader().load(flie, (image) => {
      // console.log(image)
      let width = image.height

      for (let i = 0; i < tilesNum; i++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = width;
        canvas.width = width;
        context.drawImage(image, width * i, 0, width, width, 0, 0, width, width);
        textures[i].image = canvas;
        textures[i].needsUpdate = true;

      }
    })

    return textures;


  }

  initCube() {
    const textures = this.getTexturesFromAtlasFile('/static/assets/textures/cube/sun_temple_stripe.jpg', 6)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials: THREE.MeshBasicMaterial[] = [];
    for (let i = 0; i < textures.length; i++) {
      materials.push(
        new THREE.MeshBasicMaterial({
          map: textures[i]
        })
      )

    }

    let cube = this.cube = new THREE.Mesh(geometry, materials);
    cube.geometry.scale(1, 1, -1);
    cube.castShadow = true;
    cube.position.set(0, 0, 0);

    this.scene.add(cube)
  }
}


