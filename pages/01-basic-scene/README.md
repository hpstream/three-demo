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


## 使用轨道控制器控制物体；








