## 光与阴影

学习目标：
- 常见的光的类型
- 实现阴影的五大步骤
- 平行光实现阴影
- 聚光灯实现阴影

## 1.常见的光的类型

- 环境光(AmbientLight)
- 平行光(DirectionalLight)
- 聚光灯(SpotLight)

> 环境光就像阴天周围的光，是根据物体的反射所形成的光，这种光不会产生阴影。平行光和聚光灯可以产生阴影

## 2. 实现阴影的五大步骤

1. 材质要满足能够对光照有反应
2. 设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
3. 设置光照投射阴影 directionalLight.castShadow = true;
4. 设置物体投射阴影 sphere.castShadow = true;
5. 设置物体接收阴影 plane.receiveShadow = true;

```typescript

/**
 *  创建一个球体
 */
let sphereBufferGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
let standardMaterial = new THREE.MeshStandardMaterial()
let sphere = new THREE.Mesh(sphereBufferGeometry, standardMaterial)
// 允许发射阴影
sphere.castShadow = true;
scene.add(sphere);

// 创建一个平面

let planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, standardMaterial)
plane.material.side = THREE.DoubleSide;
plane.position.set(0, -1, 0)
plane.rotation.set(-Math.PI / 2, 0, 0)

// 允许接受阴影
plane.receiveShadow = true;
scene.add(plane)


// 增加光源
// 环境光
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)

// 平行光
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

// 允许发射阴影
directionalLight.castShadow = true;
directionalLight.position.set(5, 5, 5);
const helper = new THREE.DirectionalLightHelper(directionalLight, 1, 0x00ffffff);
scene.add(helper);

scene.add(directionalLight)


/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
// 设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);

```

**注意：五个步骤一个都不能少，少了一个阴影都不生效。**

## 3. 聚光灯实现阴影

> 平行光是透视相机，能控制的API如下

```typescript

// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
// directionalLight.shadow.mapSize.set(4096, 4096);
// console.log(directionalLight.shadow);

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

```


## 3. 平行光实现阴影

> 平行光是正交相机，能控制的API如下

```typescript

// 设置阴影贴图模糊度
spotLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
// directionalLight.shadow.mapSize.set(4096, 4096);
// console.log(directionalLight.shadow);

spotLight.target = sphere;
spotLight.angle = Math.PI / 6;
spotLight.distance = 0;
spotLight.penumbra = 0;
spotLight.decay = 0;

spotLight.shadow.camera.fov = p.fov;
spotLight.shadow.camera.far = p.far;
spotLight.shadow.camera.near = p.near;

```
**解释：**
- intensity - (可选参数) 光照强度。 缺省值 1。
- distance - 从光源发出光的最大距离，其强度根据光源的距离线性衰减。
- angle - 光线散射角度，最大为Math.PI/2。
- penumbra - 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
- decay - 沿着光照距离的衰减量。

