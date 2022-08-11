## 光线投射Raycaster

学习目标：
1. 什么是光线投射？
2. 学习常用api


### 1. 什么是光线投射？

> 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

### 2. 学习常用api

**raycaster:**
1. setFromCamera:使用一个新的原点和方向来更新射线。
2. intersectObjects检测所有在射线与物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个。
3. intersectObject:检测所有在射线与物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个。

**intersectObject的返回值：**

- distance —— 射线投射原点和相交部分之间的距离。
- point —— 相交部分的点（世界坐标）
- face —— 相交的面
- faceIndex —— 相交的面的索引
- object —— 相交的物体
- uv —— 相交部分的点的UV坐标。


```typescript

// 创建投射光线对象
const raycaster = new THREE.Raycaster();

// 鼠标的位置对象
const mouse = new THREE.Vector2();

// 监听鼠标的位置
window.addEventListener("click", (event) => {
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  //   console.log(event);
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(mouse, camera);

  let result = raycaster.intersectObjects(cubeArr);
  //   console.log(result);
  //   result[0].object.material = redMaterial;
  result.forEach((item) => {
    (item.object as THREE.Mesh).material = redMaterial;

  });
});


```
