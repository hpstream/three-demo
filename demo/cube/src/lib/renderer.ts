import { WebGLRenderer, Color } from "three";


function initRenderer() {
  var renderer = new WebGLRenderer();
  // render the scene
  renderer.setClearColor(new Color(0xeeeeee), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}



export default initRenderer;