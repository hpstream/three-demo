import { defineConfig } from "vite";
import * as fs from "fs";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://hpstream.github.io/three-demo/",
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
