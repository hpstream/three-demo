import{S as i,B as c,M as w,a as d,P as m,W as h}from"./three.module.f071c950.js";import{g as l}from"./index.2d9ac2c0.js";const v=document.querySelector("canvas.webgl");let e=new i;const g=new c(1,1,1),p=new w({color:16711680}),n=new d(g,p);e.add(n);var a=window.innerWidth,r=window.innerHeight,S=a/r,t=new m(75,S);t.position.z=10;l.to(n.position,{duration:1,delay:1,y:2});const o=new h({canvas:v});o.setSize(a,r);const s=()=>{o.render(e,t),window.requestAnimationFrame(s)};s();