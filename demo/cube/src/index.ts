import MagicCube from "./lib";
import paintBox from "./paint/paintBox";
import paintLight from "./paint/paintLight";
import paintPlane from "./paint/paintPlane";
// 学习目标：
// 1. 完成一个魔方；
// 2. 相机可以看魔方的每个面
// 3. 可以控制魔方旋转

function init() {
  var magicCube = new MagicCube({AxesDebug:true,StatsDebug:true,isAnimate:true});

  magicCube.addPaints(paintLight);
  // magicCube.addPaints(paintPlane);
  magicCube.addPaints(paintBox);
  magicCube.start();
  
  
  document
    .getElementById("WebGL-output")
    .appendChild(magicCube.renderer.domElement);
}
  
window.onload = init;
