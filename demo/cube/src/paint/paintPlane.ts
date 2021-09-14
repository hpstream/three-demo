import { PlaneGeometry,Mesh, MeshLambertMaterial } from "three";
import MagicCube from "../lib";
export function init(instance: MagicCube) {
  var { scene } = instance;
  // create the ground plane
  var planeGeometry = new PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new MeshLambertMaterial({ color: 0xffffff });
  var plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.name = "PlaneGeometry";

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);
}
export function update(instance: MagicCube) {
 
}

export default {
  init,
  update,
};
