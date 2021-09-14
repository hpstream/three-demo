
import * as dat from "dat.gui";
export class Controls {
  rotationSpeed = 0;
}
export default function initControls() {
  var controls = new Controls();

  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);

  return controls;
}