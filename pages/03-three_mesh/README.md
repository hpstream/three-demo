## mesh(物体)

### 1. 学习内容：
- 几何体(geometry)
  1. 顶点位置数据（position）
  2. 顶点颜色 color
  3. 顶点颜色数据插值计算
  4. 绘制五颜六色的三角形
  5. 顶点法向量(nomal) ，与光照的反射有关
  
- 贴图(texture)
  1. uv纹理贴图坐标
  2. 纹理偏移，旋转，与重复(offest,rotation,repeat,wrapS,wrapT)
  3. 纹理的显示算法与minmap(minFilter,magFilter)
  4. LoadingManager(onLoad,onProgress,onError)
- 材料(material)
  1. MeshBasicMaterial
     1. color,side,vertexColors
     2. 加载纹理(map)
     3. 透明材质与透明纹理（alphaMap,transparent,opacity）
     4. 环境遮挡贴图与强度（opMap,aoMapIntensity）
  2. MeshStandardMaterial
     1. 位移贴图(displacementMap,displacementScale)
     2. 材质的粗糙程度(roughnessMap,roughness)
     3. 材质与金属的相似度(metalnessTexture,metalness)
     4. 法线贴图(normalMap)
     5. 环境贴图(envMap)
     6. RGBELoader(加载HDR图片)
- 需要额外了解知识
  - 什么是PBR?
  - 什么是HDR图片
  - 常见PBR资源网站


> 任何物体都是由点，线，面组成的。两个顶点可以组成一个线段，三个顶点可以组成一个面，在webGL中，不管是什么物体，都是由三角形组成的，也就是说，三角形是组成几何体的最小单位

## 2. 几何体(geometry)

使用 BufferGeometry 创建一个物体

```typescript

const geometry = new THREE.BufferGeometry();

geometry.getAttribute('color') // 顶点颜色坐标
geometry.getAttribute('position') //顶点坐标
geometry.getAttribute('uv') // UV坐标
geometry.getAttribute('normal') // 法向坐标

```
### 2.1 顶点坐标
> 顶点坐标描述的是几何体顶点的位置。比如：说三角形有三个顶点，可以进行如下表示

```typescript

const vertices = new Float32Array([
  0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 2,
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

```

由于顶点的存放是采一维数组的方式，在顶点过多时，看起来会不直观，所以我们采用下面方式的书写

```typescript
const vertices = new Float32Array([
 [0, 0, 0],
 [1, 0, 0],
 [0, 1, 0],

 [0, 0, 1],
 [1, 0, 1],
 [0, 0, 2]
].flat())
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

```

### 2.2 顶点颜色坐标

```typescript 

const colors = new Float32Array(
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],

    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ].flat()
);

geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide, // 使两个面都有颜色
  vertexColors: true, // 使用顶点渲染颜色
});

```

### 2.3 当然我们可以只渲染顶点

```typescript 

// 当然我们可以个只渲染顶点
const material = new THREE.PointsMaterial({
  // color: '#ffffff',
  // side: THREE.DoubleSide,
  vertexColors: true,
  size: 1
  // transparent: true,
  // opacity: 1,

})
const triangle = new THREE.Points(geometry, material)
```


### 2.4 顶点颜色数据插值计算

```typescript 

// 当然我们可以个只渲染顶点
const material = new THREE.MeshBasicMaterial({
  // color: '#ffffff',
  side: THREE.DoubleSide,
  vertexColors: true,
  // transparent: true,
  // opacity: 1,

})
const triangle = new THREE.Mesh(geometry, material)
```
## 2.5 使用顶点实现多个五彩斑斓的三角形

```javascript

for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    vertices[j] = Math.random() * 10 - 5;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

  let color = new THREE.Color(Math.random(), Math.random(), Math.random())

  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  })
  let mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

}

```


## 3. 贴图(texture)

> UV坐标其实描述的是将一张图片渲染到几何体上，我们把图片映射到几何体的坐标，就是UV坐标。

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);

let doorColorTexture = new THREE.TextureLoader().load('/static/textures/door/color.jpg')
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  // vertexColors: true,
  map: doorColorTexture
})
let triangle = new THREE.Mesh(geometry, material)
scene.add(triangle)

```

### 3.1 纹理偏移，旋转，与重复

**为了方便理解我们使用GUI控制一些变量**

```typescript

let gui = new dat.GUI();

gui.add(doorColorTexture.offset, 'x').min(-1).max(1).step(0.1).name('offsetX')
gui.add(doorColorTexture.offset, 'y').min(-1).max(1).step(0.1).name('offsetY')

gui.add(doorColorTexture.center, 'x').min(-1).max(1).step(0.1).name('centerX')
gui.add(doorColorTexture.center, 'y').min(-1).max(1).step(0.1).name('centerY')

gui.add(doorColorTexture, 'rotation').min(0).max(Math.PI).step(0.1).name('rotation')

gui.add(doorColorTexture.repeat, 'x').min(0).max(4).name('repeatX')
gui.add(doorColorTexture.repeat, 'y').min(0).max(4).name('repeatY')

```
### 3.2 设置纹理重复的模式

```typescript

//  设置纹理重复的模式
doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
doorColorTexture.wrapT = THREE.RepeatWrapping;
```
**贴图包括三种纹理模式：**
- THREE.RepeatWrapping
- THREE.ClampToEdgeWrapping
- THREE.MirroredRepeatWrapping

**解释：**
1. ClampToEdgeWrapping是默认值，纹理中的最后一个像素将延伸到网格的边缘。
2. RepeatWrapping，纹理将简单地重复到无穷大。
3. MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像。

### 3.3 纹理的显示算法与minmap

```typescript
  var options = {
    minFilters: {
      NearestFilter: THREE.NearestFilter,
      NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
      NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
      'LinearFilter ': THREE.LinearFilter,
      'LinearMipMapLinearFilter (Default)': THREE.LinearMipMapLinearFilter,
      LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
    },
    magFilters: {
      NearestFilter: THREE.NearestFilter,
      'LinearFilter (Default)': THREE.LinearFilter,
    },
  }
// texture纹理显示设置
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
```

**magFilter：**
> 当一个纹素覆盖大于一个像素时，贴图将如何采样。默认值为THREE.LinearFilter。

- NearestFilter: THREE.NearestFilter,
- 'LinearFilter (Default)': THREE.LinearFilter,


**minFilter:**
> 当一个纹素覆盖小于一个像素时，贴图将如何采样。默认值为THREE.LinearMipmapLinearFilter。
- NearestFilter: THREE.NearestFilter,
- NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
- NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
- 'LinearFilter ': THREE.LinearFilter,
- 'LinearMipMapLinearFilter (Default)': THREE.LinearMipMapLinearFilter,
- LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,

[详细中文文档](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/textures/Texture)


### 3.4 LoadingManager(onLoad,onProgress,onError)

> 用于控制资源加载进度

```typescript

let event = {
  onLoad: function () {
    // console.log("图片加载完成");
  },
  onProgress: function (url, num, total) {
    // console.log("图片加载完成:", url);
    // console.log("图片加载进度:", num);
    // console.log("图片总数:", total);
    let value = ((num / total) * 100).toFixed(2) + "%";
    console.log("加载进度的百分比：", value, num, total);

  },
  onError: function (e) {
    console.log(e, "图片加载出现错误");
    // console.log(e);
  }
};
// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);
const geometry = new THREE.BoxGeometry(1, 1, 1, 200, 200);
let textureLoader = new THREE.TextureLoader(loadingManager);

```
 

## 4. 材料(material)

> MeshStandardMaterial 基础材料
### 4.1 加载纹理(map)

> 主要用于控制物体是如何显示，和如何让物体更加逼真的显示

```typescript

let doorColorTexture = new THREE.TextureLoader().load('/static/textures/door/color.jpg')
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  // vertexColors: true,
  map: doorColorTexture
})

```

### 4.2 透明材质与透明纹理（alphaMap,transparent,opacity）
```typescript
 let alphaTexture = new THREE.TextureLoader().load('/static/textures/door/alpha.jpg')

const material = new THREE.MeshBasicMaterial({
  // color: '#ff0000',
  side: THREE.DoubleSide,
  // vertexColors: true,
  map: doorColorTexture,
  alphaMap: alphaTexture,
  transparent: true,
  // opacity: 0.3,
})
```

> alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为null。


### 4.3 opMap纹理

```typescript
let doorAoTexture = new THREE.TextureLoader().load('/static/textures/door/ambientOcclusion.jpg')
const material = new THREE.MeshBasicMaterial({
  // color: '#ff0000',
  side: THREE.DoubleSide,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  transparent: true,
  // opacity: 0.3,
})

geometry.setAttribute('uv2', new BufferAttribute(geometry.getAttribute('uv').array, 2))

```

**该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。**


> PBR 标准网格材质(MeshStandardMaterial)


### 4.5 其他贴图
- 位移贴图(displacementMap,displacementScale)
- 材质的粗糙程度(roughnessMap,roughness)
- 材质与金属的相似度(metalnessTexture,metalness)
- 法线贴图(normalMap)

```typescript

const geometry = new THREE.BoxGeometry(1, 1, 1, 200, 200);
let textrueLoader = new THREE.TextureLoader();
let doorColorTexture = textrueLoader.load('/static/textures/door/color.jpg')
let alphaTexture = textrueLoader.load('/static/textures/door/alpha.jpg')
let doorAoTexture = textrueLoader.load('/static/textures/door/ambientOcclusion.jpg')
let heightTexture = textrueLoader.load('/static/textures/door/height.jpg')
const material = new THREE.MeshStandardMaterial({
  // color: '#ff0000',
  side: THREE.DoubleSide,
  // vertexColors: true,
  map: doorColorTexture,
  alphaMap: alphaTexture,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  transparent: true,
  displacementMap: heightTexture,
  displacementScale: 0.05
  // opacity: 0.3,
})

// 增加光源
// 环境光
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)

// 平行光
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

directionalLight.position.set(10, 10, 10);
scene.add(directionalLight)

```

**注意：这种材质收到光照影响，所以一定需要光照**

### 4.6 环境贴图(envMap)

> 导入图片

```typescript
let envMap = cubeTextureLoader.load([
  "/static/textures/environmentMaps/1/px.jpg",
  "/static/textures/environmentMaps/1/nx.jpg",
  "/static/textures/environmentMaps/1/py.jpg",
  "/static/textures/environmentMaps/1/ny.jpg",
  "/static/textures/environmentMaps/1/pz.jpg",
  "/static/textures/environmentMaps/1/nz.jpg",
])


let gui = new dat.GUI();
gui.add(material, 'metalness', 0, 1, 0.1)
gui.add(material, 'roughness', 0, 1, 0.1)

```

> 加载方式一: 给服务本身设置贴图

```typescript

const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0,
  envMap:envMap
})

```

> 加载方式二：给场景设置贴图，让PBR材质的物体，可以反射周围的光

```typescript

scene.background = envMap;
scene.environment = envMap;

```

### 4.7 RGBELoader(加载HDR图片)
> 加载质量更好的DHR图片

```typescript

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 目标：了解threejs的基本内容

// 目标：设置环境纹理
// 加载hdr环境图
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("/static/textures/hdr/003.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

```


## 5. 需要额外了解知识

### 5.1 什么是PBR?

[什么是PBR](https://www.bilibili.com/read/cv15810245/)

### 5.2 什么是HDR图片

[什么是HDR](https://baike.baidu.com/item/HDR%E6%91%84%E5%BD%B1/3797822)
### 5.3 常见PRB资源网站

[poliigon](https://www.poliigon.com/textures/ceramics)

[3dtextures](https://3dtextures.me/)

[arroway-textures](https://www.arroway-textures.ch/products/designcraft-4/)

[quixel](https://quixel.com/pricing)



