import Stats from "stats.js";

export default function initStats(id: string, value: number = 2) {
  var stats = new Stats();
  stats.showPanel(value); // 0: fps, 1: ms
  // Align top-left
  stats.dom.style.position = "absolute";
  stats.dom.style.left = "0px";
  stats.dom.style.top = "0px";

  document.getElementById(id).appendChild(stats.dom);

  return stats;
}
