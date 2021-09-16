import MagicCube from "./lib";
import paintBox from "./paint/paintBox";
import paintLight from "./paint/paintLight";
import paintPlane from "./paint/paintPlane";
import TWEEN from'@tweenjs/tween.js'
var object: THREE.Object3D;
// 学习目标：
// 1. 完成一个魔方；
// 2. 相机可以看魔方的每个面
// 3. 可以控制魔方旋转
function animate(time:number) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);
function rotateCube() {
    var arr: THREE.Object3D[] = [];
    object.children.forEach((row) => {
      if (row.position.x == -4) {
        console.log(row.position);
        arr.push(row)
      }
    })
  let deg = 0;
  var differenceDeg:number;
  let coords = { deg };
  new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
    .to({ deg: Math.PI }, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((props) => {
      // coords = props;
      differenceDeg = props.deg - deg;
      deg = props.deg;
      arr.forEach((box)=>{
        var { x, y, z } = box.position;
        box.position.set(
          x,
          y * Math.cos(differenceDeg) + z * Math.sin(differenceDeg),
          -y * Math.sin(differenceDeg) + z * Math.cos(differenceDeg)
        );
        box.rotateX(0-differenceDeg);
      })
    })
    .onComplete((props) => {
      arr.forEach((box) => {
        var { x, y, z } = box.position;
        // 矫正坐标
        box.position.set(Math.round(x), Math.round(y), Math.round(z));
      });
    })
    .start();
}


function init() {
  var magicCube = new MagicCube({
    AxesDebug: true,
    StatsDebug: true,
    isAnimate: true,
  });

  magicCube.addPaints(paintLight);
  // magicCube.addPaints(paintPlane);
  magicCube.addPaints(paintBox);
  magicCube.start();
  object = magicCube.scene.children.find((mesh) => {
      return mesh.name == "GroupCube";
  }) as THREE.Object3D;
  

  setTimeout(() => {
     rotateCube();
  }, 1000);

  // setTimeout(() => {

  //   var arr: THREE.Object3D[] = []
  //   object.children.forEach((row) => {
  //     if (row.position.x == -4) {
  //       arr.push(row)
  //     }
  //   })

  //   arr.forEach((box, index) => {
  //     var { x, y, z } = box.position;
  //     box.position.set(
  //       x * Math.cos(deg) - y * Math.sin(deg),
  //       x * Math.sin(deg) + y * Math.cos(deg),
  //       z
  //     );
  //     box.rotateZ(deg);
  //   });
  // }, 1000);

  var dom = document.getElementById("WebGL-output");

  if (dom) {
    dom.appendChild(magicCube.renderer.domElement);
  }
}

window.onload = init;
