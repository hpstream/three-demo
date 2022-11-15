## 粒子(points)

学习目标：
1. 实现例子常用的API
2. 实现例子基础案例
3. 实现星河效果


## 1. 实现例子常用的API


**PointsMaterial:**

1. size: 设置顶点大小
2. sizeAttenuation:指定点的大小是否因相机深度而衰减。（仅限透视摄像头。）默认为true。
3. depthWrite:渲染此材质是否对深度缓冲区有任何影响。默认为true。
4. blending: 在使用此材质显示对象时要使用何种混合。
5. transparent:定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。默认：false;

[详细文档](https://threejs.org/docs/index.html?q=poi#api/zh/materials/Material)

```javascript

// 创建球体
let sphereGeometry = new THREE.SphereBufferGeometry(3, 30, 30)

const pointsMaterial = new THREE.PointsMaterial({
  // color: '#ffc0cb',
  size: 0.1
})
// // 相机深度而衰减
pointsMaterial.sizeAttenuation = true;
const mesh = new THREE.Points(sphereGeometry, pointsMaterial);

// 载入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/static/textures/particles/2.png");
// 设置点材质纹理
pointsMaterial.map = texture;
pointsMaterial.alphaMap = texture;
pointsMaterial.transparent = true;
pointsMaterial.depthWrite = false;

pointsMaterial.blending = THREE.AdditiveBlending;

scene.add(mesh);

```


## 2. 实现例子基础案例

```typescript 

function createPoints(url: string, size = 0.5,count=5000) {
  // 创建球体

  let sphereGeometry = new THREE.BufferGeometry();
  // let count = ;
  // 设置缓冲区数组
  let positions = new Float32Array(count * 3)
  // 设置粒子顶点颜色
  let colors = new Float32Array(count * 3)

  for (let i = 0; i < positions.length; i++) {
    positions[i] = Math.random() * 100 - 50;
    colors[i] = Math.random();
  }

  sphereGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const pointsMaterial = new THREE.PointsMaterial({
    // color: '#ffc0cb',
    size
  })
  // // 相机深度而衰减
  pointsMaterial.sizeAttenuation = true;
  const mesh = new THREE.Points(sphereGeometry, pointsMaterial);

  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(`/static/textures/particles/${url}.png`);
  // 设置点材质纹理
  pointsMaterial.map = texture;
  pointsMaterial.alphaMap = texture;
  pointsMaterial.transparent = true;
  pointsMaterial.depthWrite = false;

  pointsMaterial.blending = THREE.AdditiveBlending;
  scene.add(mesh);

}

const points = createPoints("1", 1.5);
const points2 = createPoints("xh", 1);
const points3 = createPoints("xh", 2);

```

### 实现星河效果

```typescript

let scene = new THREE.Scene();
// 参数
const params = {
  count: 1000,
  size: 0.1,
  radius: 5,
  branch: 3,
  color: "#ff6030",
  rotateScale: 0.3,
  endColor: "#1b3984",
  rate: 10,
};


const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("/static/textures/particles/1.png");
let sphereGeometry = new THREE.BufferGeometry();
const pointsMaterial = new THREE.PointsMaterial({
  size: params.size,
  sizeAttenuation: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  map: particlesTexture,
  alphaMap: particlesTexture,
  transparent: true,
  vertexColors: true,

})
pointsMaterial.transparent = true;
pointsMaterial.depthWrite = false;
// 相机深度而衰减
pointsMaterial.sizeAttenuation = true;
const mesh = new THREE.Points(sphereGeometry, pointsMaterial);

pointsMaterial.blending = THREE.AdditiveBlending;
scene.add(mesh);


/**
 * 几何体
 */
function generateGalaxy() {
  let startColor = new THREE.Color(params.color);
  const endColor = new THREE.Color(params.endColor);
  // 设置缓冲区数组
  let positions = new Float32Array(params.count * 3)
  // 设置粒子顶点颜色
  let colors = new Float32Array(params.count * 3)

  for (let i = 0; i < params.count; i++) {
    const current = i * 3;
    let angelBranch = i % params.branch / params.branch * 2 * Math.PI;
    let random = Math.random()
    let distance = params.radius * Math.pow(random, 3);

    const randomX =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;

    // const randomX =
    //   (Math.pow(Math.random() * 2 - 1, 3) * (distance));
    // const randomY =
    //   (Math.pow(Math.random() * 2 - 1, 3) * (distance));
    // const randomZ =
    //   (Math.pow(Math.random() * 2 - 1, 3) * (distance));

    positions[current] = Math.sin(angelBranch + distance * params.rotateScale) * distance + randomX;
    positions[current + 1] = 0 + randomY;
    positions[current + 2] = Math.cos(angelBranch + distance * params.rotateScale) * distance + randomZ;


    // 混合颜色，形成渐变色
    const mixColor = startColor.clone();
    mixColor.lerp(endColor, distance / params.radius);

    colors[current] = mixColor.r;
    colors[current + 1] = mixColor.g;
    colors[current + 2] = mixColor.b;
  }

  sphereGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

}


```

> 为了使星河效果看着比较逼真，在案例中使用了很多数学相关的公式，需要线理解了公式才能明白代码在干什么。

