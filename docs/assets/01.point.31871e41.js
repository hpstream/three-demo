import"./modulepreload-polyfill.b7f2da20.js";import{S as p,t as c,J as u,K as w,h as g,O as o,U as h,P as v,A as b,W as A}from"./three.module.e9e6bd54.js";import{O as x}from"./OrbitControls.cacaacad.js";import{G as y}from"./dat.gui.module.6914edc7.js";let i=new p,B=new c(3,30,30);const e=new u({size:.1});e.sizeAttenuation=!0;const f=new w(B,e),z=new g,d=z.load("/static/textures/particles/2.png");e.map=d;e.alphaMap=d;e.transparent=!0;e.depthWrite=!1;e.blending=o;i.add(f);let r=new y;r.add(e,"sizeAttenuation");r.add(e,"depthWrite");r.add(e,"transparent");console.log(o);r.add(e,"blending",["NoBlending","NormalBlending","AdditiveBlending","SubtractiveBlending","MultiplyBlending","CustomBlending"]).onChange(a=>{e.blending=h[a]});var s=window.innerWidth,l=window.innerHeight,C=s/l,n=new v(75,C,.1,1e3);n.position.z=10;n.position.y=10;n.position.x=10;let E=new b(5);i.add(E);const t=new A;t.setSize(s,l);t.render(i,n);document.body.appendChild(t.domElement);const G=new x(n,t.domElement);G.listenToKeyEvents(document.body);function m(a){t.render(i,n),requestAnimationFrame(m)}window.requestAnimationFrame(m);