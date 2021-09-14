import initRenderer from "./renderer";
import initCamera from "./camera";
import initScene from "./scene";
import initControls, { Controls } from "./controls";
import initAxesHelper from "./utils/axesHelper";
import initStats from "./utils/stats";
import { OrbitControls } from "./orbitcontrols";


interface MagicCubeParams {
  AxesDebug?: boolean;
  StatsDebug?: boolean;
  AxesLength?: number;
  isAnimate?:boolean;
}
interface ObjectFn {
  init: (instance: MagicCube) => void;
  update?: (instance: MagicCube) => void;
}

export default class MagicCube {
  objects: ObjectFn[] = [];
  renderer = initRenderer();
  camera = initCamera();
  scene = initScene();
  controls = initControls();
  stats?: ReturnType<typeof initStats>;
  constructor(private params: MagicCubeParams) {
    if (params.AxesDebug) {
      this.initAxesHelper();
    }
    if (params.StatsDebug) {
      this.initStats();
    }

    var orbitcontrols = new OrbitControls(this.camera);
    console.log(orbitcontrols);
  }
  start() {
    this.initPaints();
    this.scene.add(this.camera);
    this.camera.lookAt(this.scene.position);
    this._update();
  }
  initPaints() {
    this.objects.forEach((object) => {
      object.init(this);
    });
  }
  updatePaints(){
    this.objects.forEach((object) => {
      object.update&&object.update(this);
    });
  }
  addPaints(paint: ObjectFn) {
    this.objects.push(paint);
  }
  _update() {
    if (this.stats) {
      this.stats.update();
    }
    this.updatePaints();
    if(this.params.isAnimate){
     requestAnimationFrame(this._update.bind(this));
    }
    this.renderer.render(this.scene, this.camera);
  }

  initAxesHelper() {
    initAxesHelper(this.scene, this.params.AxesLength || 20);
  }
  initStats() {
    this.stats = initStats("Stats-output");
  }
}
