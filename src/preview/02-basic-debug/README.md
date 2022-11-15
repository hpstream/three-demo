## 1. 基础开发与调试

### 学习内容

1. 坐标辅助器
2. 物体的移动，缩放和旋转
3. reqeustAnimationFrame的应用
4. clock跟踪时间处理动画
5. Gsap动画库的使用与原理
6. 根据尺寸适应画面
7. js控制画布全屏和退出全屏
8. 应用图形用户界面更改变量


### 2. 坐标辅助器

```typescript

let axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

```
**其中：红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.**

### 3.物体移动，缩放和旋转

```typescript

// 物体移动
mesh.position.x = 2;
mesh.position.y = 2;
mesh.position.z = 2;
// 等价于
mesh.position.set(2, 2, 2)

// 物体缩放
mesh.scale.x = 2;
mesh.scale.y = 2;
mesh.scale.z = 2;
// 等价于
mesh.scale.set(2, 2, 2)


// 物体旋转
mesh.rotateX(Math.PI / 4)
mesh.rotateY(Math.PI / 4)
mesh.rotateZ(Math.PI / 4)
// 等价于
mesh.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4, 'XYZ');

```

**此api与css的api类型，可以按照css来学习**


### 4. reqeustAnimationFrame的应用

> setInterval 计时不够准确，这里使用reqeustAnimationFrame来实现动画

```javascript

function render(time: number) {
  // 方式一
  let t = time / 1000 % 5;
  mesh.position.x = t*1;
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
window.requestAnimationFrame(render);

```
### 5.clock跟踪时间处理动画

```javascript

// 方式二
let clock = new THREE.Clock();
function render(time: number) {
  let t = clock.getElapsedTime() % 5;
  mesh.position.x = t * 1;
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
window.requestAnimationFrame(render);

```

### 6. Gsap动画库的使用与原理

> 为了方便实现动画我们引入GSAP,这个是一个和threejs配合使用的动画库，使用起来十分方便

[Gasp官网](https://www.tweenmax.com.cn/api/tweenmax/)

[英文官网](https://greensock.com/gsap/)

```javascript

let animate = gsap.to(mesh.position, { 
  x: 5,  // 位移
  duration: 2,  // 持续时间
  repeat: -1,  // 运行次数，-1表示无限次
  yoyo: true,  // 是否重复往返的动画
  ease: "power1.inOut" 
})

```
**gsap还有很多api,详细API可以去官网学习。**


### 7. 根据尺寸适应画面

```javascript

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  console.log('resize')

  renderer.render(scene, camera)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})

```

### 8. js控制画布全屏和退出全屏

```javascript

window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    //   双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    //   退出全屏，使用document对象
    document.exitFullscreen();
  }
  //   console.log(fullScreenElement);
});
```

### 9. 应用图形用户界面更改变量
> dat.dui是和threejs搭配使用的一个图形用户界面库，可以不用更改代码，来控制物体的变化。其主要包括数字，字符串，布尔值，函数的控制。

### 9.1 引入库

```javascript

import * as dat from "dat.gui";

let gui = new dat.GUI();
// 通过文件夹的方式展示，默认关闭文件夹
let g = gui.addFolder("立方体");
// 打开文件夹
g.open();

```

### 9.2 控制数字

> 控制物体颜色
> 
```javascript


// 数字操作
g.add(mesh.position, "x")
  .min(0)  // 设置最小值
  .max(5) // 设置最大值
  .step(0.1) // 设置步长
  .name("移动x") // 设置名称
  .onChange((value) => {
    console.log("值被修改：", value);
  })
  .onFinishChange((value) => {
    console.log("完全停下来:", value);
  });

```

### 9.2 控制颜色
> 控制物体颜色

```javascript

let params = {
  color: '#000000'
}
// 修改颜色,字符串操作
g.addColor(params, 'color').onChange((value: string) => {
  mesh.material.color.set(value)
})

```

### 9.3 布尔值
> 控制物体是否可见

```javascript

// 布尔值
g.add(mesh, 'visible').name('是否显示')

```

### 9.4 函数

```javascript
let params = {
   fn: () => {
    let animate = gsap.to(mesh.position, { x: 5, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" })

  }
}
g.add(params, 'fn').name('开始动画')

```

**这个库也常用于threejs的调试。**








