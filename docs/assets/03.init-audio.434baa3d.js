import"./modulepreload-polyfill.b7f2da20.js";import{S as v,t as x,n as c,a as m,o as A,p as P,q as f,P as b,A as z,W as L,C as W,V as H}from"./three.module.e9e6bd54.js";import{O as B}from"./OrbitControls.cacaacad.js";import{W as C,V as s,S as E,M as h,B as y,P as V}from"./cannon-es.bbb50b7f.js";let i=new v;const k=new x(1,20,20),q=new c,o=new m(k,q);o.castShadow=!0;o.position.set(0,5,0);i.add(o);const n=new m(new A(20,20),new c);n.position.set(0,0,0);n.rotation.x=-Math.PI/2;n.receiveShadow=!0;i.add(n);const G=new P(16777215,.5);i.add(G);const d=new f(16777215,.5);d.position.set(-5,8,-5);d.castShadow=!0;i.add(d);let r=new C;r.gravity=new s(0,-9.8,0);let F=new E(1),I=new h,a=new y({shape:F,material:I,mass:1,position:new s(o.position.x,o.position.y,o.position.z)});r.addBody(a);const p=new Audio("/static/assets/metalHit.mp3");a.addEventListener("collide",l=>{const w=l.contact.getImpactVelocityAlongNormal();console.log(w),w>2&&(p.currentTime=0,p.play())});let R=new V,D=new h({}),S=new y({shape:R,material:D,mass:0,position:new s(n.position.x,n.position.y,n.position.z)});S.quaternion.setFromAxisAngle(new s(1,0,0),-Math.PI/2);r.addBody(S);var g=window.innerWidth,u=window.innerHeight,O=g/u,e=new b(75,O,.1,1e3);e.position.z=15;e.position.y=15;e.position.x=15;let T=new z(5);i.add(T);const t=new L;t.shadowMap.enabled=!0;t.setSize(g,u);e.lookAt(0,0,0);t.render(i,e);document.body.appendChild(t.domElement);const j=new B(e,t.domElement);j.listenToKeyEvents(document.body);let K=new W;function M(l){t.render(i,e),r.step(1/120,K.getDelta()),o.position.copy(new H(a.position.x,a.position.y,a.position.z)),requestAnimationFrame(M)}window.requestAnimationFrame(M);window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});
