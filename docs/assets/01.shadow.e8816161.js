import"./modulepreload-polyfill.b7f2da20.js";import{S as h,t as m,n as p,a as r,o as c,D as u,p as S,q as g,y as v,P as y,A as b,W as L}from"./three.module.e9e6bd54.js";import{O as M}from"./OrbitControls.cacaacad.js";let n=new h,P=new m(1,20,20),o=new p,d=new r(P,o);d.castShadow=!0;n.add(d);let x=new c(10,10);const i=new r(x,o);i.material.side=u;i.position.set(0,-1,0);i.rotation.set(-Math.PI/2,0,0);i.receiveShadow=!0;n.add(i);let H=new S(16777215,.5);n.add(H);let a=new g(16777215,.5);a.castShadow=!0;a.position.set(5,5,5);const f=new v(a,1,16777215);n.add(f);n.add(a);var s=window.innerWidth,w=window.innerHeight,A=s/w,e=new y(75,A,.1,1e3);e.position.z=10;e.position.y=10;e.position.x=10;let G=new b(5);n.add(G);const t=new L;t.shadowMap.enabled=!0;t.setSize(s,w);t.render(n,e);document.body.appendChild(t.domElement);const W=new M(e,t.domElement);W.listenToKeyEvents(document.body);function l(z){t.render(n,e),requestAnimationFrame(l)}window.requestAnimationFrame(l);window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});