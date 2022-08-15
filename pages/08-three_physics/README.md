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

### 2.4 cannon-es的导入声音


```typescript

// 创建声音
const hitSound = new Audio('/static/assets/metalHit.mp3')

cSpherebody.addEventListener('collide', (e: any) => {

  // 获取碰撞的强度
  const impactStrength = e.contact.getImpactVelocityAlongNormal();
  console.log(impactStrength);
  if (impactStrength > 2) {
    //   重新从零开始播放
    hitSound.currentTime = 0;
    hitSound.play();
  }

})
```

### 物理世界的主要代码


```typescript
// 创建一个物理世界
let world = new CANNON.World();

// 设置重力
world.gravity = new CANNON.Vec3(0, -9.8, 0)

let cubeArr: {
  mesh: THREE.Mesh,
  body: CANNON.Body
}[] = [];
let cCubeMaterial = new CANNON.Material({
  friction: 0.1,
  restitution: 0.7,
});

function createCube() {
  // 创建球和平面
  const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial();
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.set(0, 6, 0)
  scene.add(cube);
  // 创建一个物理小球
  let cCubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));


  let cSpherebody = new CANNON.Body({
    shape: cCubeShape,
    material: cCubeMaterial,
    mass: 1,// 质量
    position: new CANNON.Vec3(cube.position.x, cube.position.y, cube.position.z)// 位置
  })
  // 将物体添加至物理世界
  world.addBody(cSpherebody);

  cSpherebody.applyForce(
    new CANNON.Vec3(0, 50, 0),// 添加力的大小和方向
    new CANNON.Vec3(1, 0, 0) // 添加力所在的位置
  )

  const hitSound = new Audio('/static/assets/metalHit.mp3')
  cSpherebody.addEventListener('collide', (e: any) => {
    // 创建声音
    // 获取碰撞的强度
    //   console.log("hit", e);

    const impactStrength = e.contact.getImpactVelocityAlongNormal();
    // console.log(impactStrength);
    if (impactStrength > 2) {
      //   重新从零开始播放
      hitSound.currentTime = 0;
      hitSound.volume = impactStrength > 24 ? 1 : impactStrength / 12 / 2
      hitSound.play();
    }

  })
  cubeArr.push({
    mesh: cube,
    body: cSpherebody
  })
}

document.addEventListener('dblclick', () => {
  createCube();
})

// 创建地面
let floorShape = new CANNON.Plane();
// 创建材质
let floorMaterial = new CANNON.Material({
  // friction: 0.1,
  // restitution: 0.7,
});

let floorBody = new CANNON.Body({
  shape: floorShape,
  material: floorMaterial,
  mass: 0,
  position: new CANNON.Vec3(floor.position.x, floor.position.y, floor.position.z)
})
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody)

// // 设置2中种材质的碰撞系数
const defaultContactMaterial = new CANNON.ContactMaterial(cCubeMaterial, floorMaterial, {
  friction: 0.1,
  restitution: 0.7,
})

```






