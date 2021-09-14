// 声明同名模块
import * as THREE from "three";
//千万不要忘记了引号
declare module "three" {
  export class MeshFaceMaterial<T> extends THREE.Material {
    constructor(parameters:T[]);
  }
}