import * as THREE from "three";
import MagicCube from "../lib";
var group: THREE.Group;
var xyz:any = [];
export function init(instance: MagicCube) {
  var { scene } = instance;
  // create the ground plane
  var boxGeometry = new THREE.BoxGeometry(3.9, 3.9, 3.9);
  let mats: THREE.MeshBasicMaterial[] = [];
  mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xc41e3a }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  // var faceMaterial = new THREE.MeshFaceMaterial(mats);
  var box = new THREE.Mesh(boxGeometry, mats);
  group = new THREE.Group();
  group.name = "GroupCube";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        var tem = box.clone();
        tem.position.set(-4 + i * 4, -4 + j * 4, -4 + 4 * k);
        xyz.push(tem.position);
        group.add(tem);
      }
    }
  }
  group.position.set(0, 0, 0)
  scene.add(group);
  return group;
}
// var i = 0.02;
export function update(instance: MagicCube) {

  // group.children.forEach((box, index) => {
  //   // // box.rotation.set(0,i,0)
  //   // var { x, y, z } = box.position;
  //   // box.position.set(
  //   //    x * Math.cos(j) - y * Math.sin(j),
  //   //    x * Math.sin(j) + y * Math.cos(j),
  //   //    z
  //   //  );
  //   // box.rotateZ(j);
  // });
}




export default {
  init,
  update,
};