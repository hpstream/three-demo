import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { GUI } from "dat.gui";


export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  meterial: THREE.PointsMaterial;
  water: Water;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  sky: Sky;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    // 太阳
    let sun = new THREE.Vector3(-80, 5, -100);
    // 水
    let water = this.water = new Water(new THREE.PlaneGeometry(10000, 10000), {
      textureHeight: 512,
      textureWidth: 512,
      waterNormals: new THREE.TextureLoader().load('/static/assets/textures/waternormals.jpg', (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: sun,
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      fog: this.scene.fog !== undefined
    })

    water.rotation.x = -Math.PI / 2;
    this.scene.add(water);


    //sky
    let sky = this.sky = new Sky();
    sky.scale.setScalar(10000);
    sky.material.uniforms['sunPosition'].value.copy(sun);

    this.scene.add(sky);

    // cube
    let cube = this.cube = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshStandardMaterial({

    }))
    this.scene.add(cube);





    // gui
    let gui = new GUI();
    let sunParams = {
      elevation: 2, // 极角 theta角，纬度
      azimuth: -150,// 方向角 phi角度，经度
    }

    const folderSun = gui.addFolder('太阳');
    folderSun.open();

    folderSun.add(sunParams, 'elevation', 0, 90, 0.05).onChange(updateSun);
    folderSun.add(sunParams, 'azimuth', -180, 180, 0.1).onChange(updateSun);


    function updateSun() {
      const theta = THREE.MathUtils.degToRad(90 - sunParams.elevation); //极角
      const phi = THREE.MathUtils.degToRad(sunParams.azimuth); // 方位角
      sun.setFromSphericalCoords(1, theta, phi);
      sky.material.uniforms['sunPosition'].value.copy(sun);
    }

    let waterParams = water.material.uniforms;
    const folderWater = gui.addFolder('水');
    folderWater.open();

    folderWater.add(waterParams.distortionScale, 'value', 0, 40, 0.1).name('distortionScale');
    folderWater.add(waterParams.size, 'value', 0.1, 20, 0.1).name('size');


    const skyUniforms = sky.material.uniforms;
    // console.log(skyUniforms)
    skyUniforms['turbidity'].value = 10; // 浑浊度
    skyUniforms['rayleigh'].value = 2; // 瑞利值
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.008;

  }




}


