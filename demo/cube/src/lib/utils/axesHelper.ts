import {
  Scene,
  AxesHelper,
} from "three";
export default function initAxesHelper(scene: Scene, size:number) {
  const axes = new AxesHelper(size);
  scene.add(axes);
  // console.log(scene);
}
