
import { GUI } from "dat.gui";
import * as THREE from "three";

import { OimoPhysics } from "three/examples/jsm/physics/OimoPhysics";
import { Page } from "./src/page/page";


let page = new Page();

page.render();

// let mouse: THREE.Vector2 = new THREE.Vector2(1, 1);
// let boxs: THREE.InstancedMesh;

// // renderer.physicallyCorrectLights = true;
// let raycaster = new THREE.Raycaster();
// // let amount = 4;
// let count = 100;
