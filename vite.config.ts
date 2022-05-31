import {defineConfig} from "vite";
import * as fs from "fs";
import * as path from "path";

// console.log(fs);

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
  let data = fs.readdirSync(root);
  let dirMap: Record<string, string> = {};
  // console.log(path.resolve(__dirname, "index.html"));

  data.forEach((d) => {
    dirMap[d] = path.join(root, d, "index.html");
  });
  console.log(dirMap);

  return dirMap;
}
