import"./modulepreload-polyfill.b7f2da20.js";import{g as d}from"./index.2d9ac2c0.js";import{S as c,B as p,M as w,a as h,P as g,A as C,W as F}from"./three.module.e9e6bd54.js";import{O as f}from"./OrbitControls.cacaacad.js";import{G as B}from"./dat.gui.module.6914edc7.js";let a=new c;const i=new p(1,1,1),E=new w({color:16711680}),t=new h(i,E);console.log(i);let A=new B,r=A.addFolder("\u7ACB\u65B9\u4F53");r.open();r.add(t.position,"x").min(0).max(5).step(.1).name("\u79FB\u52A8x").onChange(e=>{console.log("\u503C\u88AB\u4FEE\u6539\uFF1A",e)}).onFinishChange(e=>{console.log("\u5B8C\u5168\u505C\u4E0B\u6765:",e)});let s={color:"#000000",fn:()=>{d.to(t.position,{x:5,duration:2,repeat:-1,yoyo:!0,ease:"power1.inOut"})}};r.addColor(s,"color").onChange(e=>{t.material.color.set(e)});r.add(t,"visible").name("\u662F\u5426\u663E\u793A");r.add(s,"fn").name("\u5F00\u59CB\u52A8\u753B");var l=window.innerWidth,m=window.innerHeight,x=l/m,n=new g(75,x,.1,1e3);n.position.z=10;n.position.y=10;n.position.x=10;let v=new C(5);a.add(v);const o=new F;o.setSize(l,m);o.render(a,n);document.body.appendChild(o.domElement);new f(n,o.domElement);window.addEventListener("dblclick",()=>{document.fullscreenElement?document.exitFullscreen():o.domElement.requestFullscreen()});function u(e){o.render(a,n),requestAnimationFrame(u)}window.requestAnimationFrame(u);
