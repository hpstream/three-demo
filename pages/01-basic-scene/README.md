## 1. threejs基础入门

学习目标：
1. 基础环境搭建；
2. 完成第一个案例 —— hello world;
3. 使用轨道控制器控制物体；


## 2.基础环境搭建
> 我们使用vite来快速构建项目。
> 文档链接： https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

### 2.1 初始化项目

> npm create vite@latest my-vue-app -- --template vue-ts

**注意：官网的模版支持很多，这里我们用ts开发threejs**

### 2.2 完成vite配置

> 为了让写完的demo支持快速预览，需要完善下git配置，配置如下：

```typescript

import { defineConfig } from "vite";
import * as fs from "fs";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://hpstream.github.io/THREE-DEMO/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: inputFn(),
    },
  },
  plugins: [],
});

function inputFn(): Record<string, string> {
  let root = path.join(process.cwd(), "pages");
  // let data = fs.readdirSync(root);
  let dirMap: Record<string, string> = {};
  deepdir(root, dirMap)
  console.log(dirMap)

  return dirMap;
}

function deepdir(root: string, dirMap: Record<string, string>) {
  let data = fs.readdirSync(root);
  data.forEach((d) => {
    let prefix = path.join(root, d)
    let stat = fs.statSync(prefix)
    if (stat.isDirectory()) {
      let file = path.join(prefix, "index.html");
      if (fs.existsSync(file)) {
        dirMap[`${d}`] = file;
      }
      deepdir(prefix, dirMap)
    }

  });
}

```
**自动遍历pages文件夹，生成可以预览的入口;**

### 2.3 调试与部署

```
npm run dev  // 调试
npm run build // 部署
```

**此内容与threejs关系不大，了解即可**

## 3.完成第一个案例 —— hello world

需要了解基础概念：场景，几何体，相机，渲染器。

- 场景：相当于一个空间。
- 几何体：相当于物体。
- 相机：相当于人的眼睛。
- 渲染：相当于一个载体，上面的所有东西通过渲染器才能被真正的看见。

```typescript

import * as THREE from "three";

// 目标：了解threejs的基本内容

// scene
let scene = new THREE.Scene();

/**
 * 几何体
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //红色
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

var camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000);
camera.position.z = 10;


/**
 * 渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement)


```

## 使用轨道控制器控制物体；
> 为了更好的观看3d物体，我们引入轨道控制区OrbitControls

```typescript

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//....

new OrbitControls(camera, renderer.domElement)

// 如果不重新绘制，物体会禁止就会不动
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
render()
```

通过上面案例：我们晃动鼠标，正方体就在移动了









