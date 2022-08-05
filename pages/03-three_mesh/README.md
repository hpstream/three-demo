## 3. 几何体

### 学习内容：
- 几何体的顶点坐标
- 几何体的顶点颜色坐标
- 几何体的UV坐标
- 几何体的法向坐标(与光照有关)

> 任何物体都是由点，线，面组成的。两个顶点可以组成一个线段，三个顶点可以组成一个面，在webGL中，不管是什么物体，都是由三角形组成的，也就是说，三角形是组成几何体的最小单位

使用 BufferGeometry 创建一个物体

```typescript

const geometry = new THREE.BufferGeometry();

geometry.getAttribute('color') // 顶点颜色坐标
geometry.getAttribute('position') //顶点坐标
geometry.getAttribute('uv') // UV坐标
geometry.getAttribute('normal') // 法向坐标

```
## 3. 顶点坐标
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

### 3.1 顶点颜色坐标

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

### 3.2 当然我们可以只渲染顶点

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


## 4. 使用顶点实现多个五彩斑斓的三角形

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

## 5. UV坐标

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

## 5.1 设置纹理重复的模式

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

