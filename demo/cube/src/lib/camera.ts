
import {
  PerspectiveCamera
} from "three";


function initCamera() {
  let camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = -50; // 红线是X轴
  camera.position.y = 0; // 蓝线是y轴
  camera.position.z = 50; // 绿线是Z轴
  return camera;
}
export default initCamera;