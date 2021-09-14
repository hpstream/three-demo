import * as THREE from "three";
import MagicCube from "../lib";
var group: THREE.Group;
var xyz = [];
export function init(instance: MagicCube) {
  var { scene } = instance;
  // create the ground plane
  var boxGeometry = new THREE.BoxGeometry(3.9, 3.9, 3.9);
  var mats: THREE.MeshBasicMaterial[] = [];
  mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xc41e3a }));
  mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff }));
  var faceMaterial = new THREE.MeshFaceMaterial(mats);
  var box = new THREE.Mesh(boxGeometry, faceMaterial);
  group = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      var tem = box.clone();

      tem.position.set(-4 + i * 4, -4 + j * 4, -4);
      // tem.position.set(0, 0, 0);
      // tem.translateX(-4 + i * 4);
      // tem.translateY(-4 + j * 4);

      xyz.push(tem.position);
      group.add(tem);
    }
  }
  group.position.set(0, 0, 0)
  scene.add(group);
  // console.log(group.children[0].position);
  // group.children[0].translateOnAxis(new THREE.Vector3(1,0,0),-12);
  // group.children[0].translateOnAxis(new THREE.Vector3(1, 0, 0), 12);
  // group.children[0].rotateZ(Math.PI / 6);
  // group.children[0].translateX(-1);
  console.log(xyz);
}
// var i = 0.02;
var j = 0.02;
export function update(instance: MagicCube) {
  var box = group.children[0];

  var { x, y, z } = box.position;
  box.position.set(
    x,
    y* Math.cos(j) - z * Math.sin(j),
    y* Math.sin(j) + z * Math.cos(j)
    
  );
  box.rotateX(j);

  group.children.forEach((box, index) => {
    // box.rotation.set(0,i,0)
    // var { x, y, z } = box.position;
    // // box.position.set(
    // //   x * Math.cos(j) - y * Math.sin(j),
    // //   x * Math.sin(j) + y * Math.cos(j),
    // //   z
    // // );
    // // box.rotateZ(j);
    // box.position.set(
    //    x * Math.cos(j) - y * Math.sin(j),
    //    x * Math.sin(j) + y * Math.cos(j),
    //    z
    //  );
    // box.rotateZ(j);
  });
}




export default {
  init,
  update,
};