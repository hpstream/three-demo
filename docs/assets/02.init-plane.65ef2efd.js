import"./modulepreload-polyfill.b7f2da20.js";import{S as M,t as g,n as w,a as p,o as u,p as x,q as v,P,A as b,W as f,C as A,V as z}from"./three.module.e9e6bd54.js";import{O as W}from"./OrbitControls.cacaacad.js";import{W as L,V as r,S as B,M as l,B as h,P as C}from"./cannon-es.bbb50b7f.js";let i=new M;const H=new g(1,20,20),k=new w,o=new p(H,k);o.castShadow=!0;o.position.set(0,5,0);i.add(o);const n=new p(new u(20,20),new w);n.position.set(0,0,0);n.rotation.x=-Math.PI/2;n.receiveShadow=!0;i.add(n);const q=new x(16777215,.5);i.add(q);const d=new v(16777215,.5);d.position.set(-5,8,-5);d.castShadow=!0;i.add(d);let s=new L;s.gravity=new r(0,-9.8,0);let E=new B(1),G=new l,a=new h({shape:E,material:G,mass:1,position:new r(o.position.x,o.position.y,o.position.z)});s.addBody(a);let V=new C,F=new l({}),c=new h({shape:V,material:F,mass:0,position:new r(n.position.x,n.position.y,n.position.z)});c.quaternion.setFromAxisAngle(new r(1,0,0),-Math.PI/2);s.addBody(c);var m=window.innerWidth,y=window.innerHeight,R=m/y,e=new P(75,R,.1,1e3);e.position.z=15;e.position.y=15;e.position.x=15;let D=new b(5);i.add(D);const t=new f;t.shadowMap.enabled=!0;t.setSize(m,y);e.lookAt(0,0,0);t.render(i,e);document.body.appendChild(t.domElement);const I=new W(e,t.domElement);I.listenToKeyEvents(document.body);let O=new A;function S(j){t.render(i,e),s.step(1/120,O.getDelta()),o.position.copy(new z(a.position.x,a.position.y,a.position.z)),requestAnimationFrame(S)}window.requestAnimationFrame(S);window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});