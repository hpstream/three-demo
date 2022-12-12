import { GUI } from "dat.gui";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";


export default class Geometry {
  floor: THREE.Mesh<THREE.BoxGeometry, THREE.ShadowMaterial>;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  mixer: THREE.AnimationMixer;

  constructor(public scene: THREE.Scene) {
    this.init();
  }

  init() {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
      color: 0x999999
    }))
    plane.rotation.x = -Math.PI / 2;

    this.scene.add(plane);

    const grid = new THREE.GridHelper(100, 40, 0, 0);

    grid.material = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide

    })


    this.scene.add(grid);

    let loader = new GLTFLoader();

    loader.load('/static/assets/models/gltf/RobotExpressive/RobotExpressive.glb', (gltf) => {
      // console.log(gltf);
      const model = gltf.scene; // grounp

      this.scene.add(model);
      const clips = gltf.animations;//数组

      let mixer = this.mixer = new THREE.AnimationMixer(model);
      let actions = {};// 所有的action;
      let activeActionObject = { state: "Walking" };//用来操作GUI的。
      let activeAction = mixer.clipAction(clips[2]); //当前选中的action
      activeAction.play();

      const face = model.getObjectByName('Head_4');
      // face.morphTargetDictionary; // object {Angry: 0, Surprised: 1, Sad: 2}
      // face.morphTargetInfluences; // 数组 [0, 0, 0]
      // console.log(face);
      // 控制眉毛
      // face.morphTargetInfluences[1] = 1
      // this.initGUI(model, clips, face)

      let gui = new GUI();
      const loopMany = ['Walking', 'Running', 'Idle', 'Dance'];
      const actionsNames = [];

      for (let i = 0; i < clips.length; i++) {
        const clip = clips[i];
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;
        if (!loopMany.includes(clip.name)) {
          action.loop = THREE.LoopOnce;
          action.clampWhenFinished = true;
        }
        actionsNames.push(clip.name);

      }
      // 调试器 1 动画选取
      const clipFloder = gui.addFolder('动画');
      clipFloder.open();
      clipFloder.add(activeActionObject, 'state').options(actionsNames).onChange(() => {
        const nextActionName = activeActionObject.state;

        fadeToAction(nextActionName, 0.5)
      })

      // 调试器 2 动画穿插
      const states = ['Idle', 'Waling', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
      const complexFolder = gui.addFolder('穿插');
      complexFolder.add(activeActionObject, 'state').options(states).onChange(() => {
        const nextActionName = activeActionObject.state;

        let previousAction = activeAction;
        fadeToAction(nextActionName, 0.5)
      })
      const emotes = ["Jump", 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];
      const api = {};
      for (let i = 0; i < emotes.length; i++) {
        const name = emotes[i];
        api[name] = function () {
          fadeToAction(name, 0.2);
          mixer.addEventListener('finished', restoreState)

        }
        complexFolder.add(api, name)

      }

      function restoreState() {
        mixer.removeEventListener("finished", restoreState);
        fadeToAction(activeActionObject.state, 0.2)
      }
      function fadeToAction(name: string, duration: number) {
        let previousAction = activeAction;
        activeAction = actions[name];
        // previousAction.fadeOut(duration).stop();
        // activeAction.fadeIn(duration).play();

        previousAction.fadeOut(duration);
        activeAction.reset().fadeIn(0.5).play();
      }


      // 调试器 3 morph
      const morphFolder = gui.addFolder('变形');
      const morphNames = Object.keys(face.morphTargetDictionary);
      // console.log(morphNames)
      for (let i = 0; i < morphNames.length; i++) {
        morphFolder.add(face.morphTargetInfluences, `${i}`, 0, 2, 0.01).name(morphNames[i]);
      }




    })
  }



  initFloor() {

  }
}


