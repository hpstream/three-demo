import{S as d,B as w,M as m,a as u,P as h,W as v,C as g}from"./three.module.f071c950.js";import{O as p}from"./OrbitControls.8ef26011.js";const i=document.querySelector("canvas.webgl");let c=new d;const f=new w(1,1,1),x=new m({color:16711680}),E=new u(f,x);c.add(E);var o=window.innerWidth,s=window.innerHeight,M=o/s,n=new h(75,M);n.position.z=10;window.addEventListener("mousemove",e=>{e.clientX/o-.5,-(e.clientY/s-.5)});window.addEventListener("touchmove",e=>{e.changedTouches[0].clientX/o-.5,-(e.changedTouches[0].clientY/s-.5)});const a=new p(n,i);a.enableDamping=!0;window.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():i.requestFullscreen&&i.requestFullscreen()});window.addEventListener("resize",()=>{let e=window.innerWidth,r=window.innerHeight;n.aspect=e/r,n.updateProjectionMatrix(),t.setSize(e,r),t.setPixelRatio(Math.min(window.devicePixelRatio,2)),console.log("Update")});const t=new v({canvas:i});t.setSize(o,s);t.setPixelRatio(Math.min(window.devicePixelRatio,2));const P=new g,l=()=>{P.getElapsedTime(),a.update(),t.render(c,n),window.requestAnimationFrame(l)};l();
