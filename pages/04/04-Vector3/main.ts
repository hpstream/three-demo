
import { GUI } from "dat.gui";
import * as THREE from "three";
import { Vector3 } from "three";


let v1 = new THREE.Vector3(1, 2, 3);
let v2 = new THREE.Vector3();

console.log(v1.isVector3);

console.log(v1 instanceof THREE.Vector3)

// setter
let positon = new Vector3();

positon.x = 12;

positon.setX(200); // 不太常用

positon.setComponent(1, 999); // 用于循环

console.log(positon)

positon.setScalar(234); // 每个分量设置值

console.log(positon)

// 克隆与复制

let v3 = new Vector3(2, 3, 4);
let v4 = v3;
v4 = v3.clone(); // 创建新对象

let v5 = new Vector3().copy(v3); // 每个分量的值相同，不涉及新建对象；

// 随机
new Vector3().random(); // 0-1; 长度 0-1.732;

new Vector3().randomDirection(); // 0-1 , 长度为1


new Vector3().setFromSphericalCoords(
  100,  // 半径
  Math.PI / 6, //极角y和向量的夹角,  90度 -纬度
  0 // z正方向，为子午线，经度

)

// 归一化(长度为1的向量，方向不变)
let v7 = new Vector3().normalize();

// 向量转动
v7.applyAxisAngle(new Vector3(0, 1, 1), Math.PI);



//向量和扁平化数组之间的转换
const positionAttr = [];
const positon1 = new Vector3(1, 2, 3)
const positon2 = new Vector3(4, 5, 6)
positon1.toArray(positionAttr, 0)
positon2.toArray(positionAttr, 2)


positon1.fromArray(positionAttr, 1)


let v10 = new Vector3(0, 4, 0);
let v11 = new Vector3(3, 0, 0);

console.log(v10 === v11) //false 恒等;
console.log(v10 == v11) //false; 值是否相等
console.log(v10.equals(v11)) // true 值相等

// 两个向量的夹角

v10.angleTo(v11); // 3.14/2
v10.distanceTo(v11) // 5
v10.manhattanDistanceTo(v11) // 7 3+4; 曼哈顿距离

// 差值
v10.lerp(v11, 0.5)
console.log(v10)

v10.lerp(v11, 0)
console.log(v10)


v10.lerp(v11, 1)
console.log(v10)





