## 物理引擎

学习目标：
1. three物理引擎
2. cannon-es的api使用
3. cannon-es的基础案例
4. cannon-es的导入声音
5. cannon-es完成案例

## 1.three物理引擎
常见的物理引擎有：
- Oimo.js
- enable3d
- ammo.js
- cannon-es

> 这里我们主要学习cannon-es的使用.

## 2.cannon-es的api使用

### 2.1 创建物理世界并设置重力

```typescript

const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);

```

### 2.2 创建一个物理世界的小球

```typescript

// 创建一个物理小球
let cSphere = new CANNON.Sphere(1);

let cSphereMaterial = new CANNON.Material({
   friction: 1, // 摩擦系数
   restitution: 1 // 弹性系数
});

let cSpherebody = new CANNON.Body({
  shape: cSphere,
  material: cSphereMaterial,
  mass: 1,// 设置质量
  position: new CANNON.Vec3(0, 4, 0)// 设置位置
})
// 将物体添加至物理世界
world.addBody(cSpherebody);

```

### 2.3 创建一个物理地面


```typescript

// 创建地面
let floorShape = new CANNON.Plane();
// 创建材质
let floorMaterial = new CANNON.Material({});

let floorBody = new CANNON.Body({
  shape: floorShape,
  material: floorMaterial,
  mass: 0, // 设置为0表示不受重力印象
  position: new CANNON.Vec3(0, -5, 0)
})
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody)

```






