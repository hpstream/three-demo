import{S as t,B as o,M as i,a as c,P as w,W as d}from"./three.module.f071c950.js";const m=document.querySelector("canvas.webgl");let e=new t;const h=new o(1,1,1),v=new i({color:16711680}),l=new c(h,v);e.add(l);var n=window.innerWidth,a=window.innerHeight,g=n/a,r=new w(75,g);r.position.z=10;const s=new d({canvas:m});s.setSize(n,a);s.render(e,r);