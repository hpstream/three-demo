import MagicCube from "../lib";
import {
  SpotLight,
  AmbientLight,
} from "three";
export  function init(instance: MagicCube) {
  // add subtle ambient lighting
  var { scene } = instance;
  var ambientLight = new AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new SpotLight(0xffffff);
  // spotLight.shadowCameraVisible = true;
  spotLight.position.set(0, 30, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

export function update(instance: MagicCube) {}

export default {
  init,
  update,
};


