import"./modulepreload-polyfill.b7f2da20.js";import{S as p,t as l,n as u,a as i,o as x,D as g,p as M,q as P,z as C,P as b,A as f,W as S}from"./three.module.e9e6bd54.js";import{O as v}from"./OrbitControls.cacaacad.js";import{G as j}from"./dat.gui.module.6914edc7.js";let n=new p,y=new l(1,20,20),s=new u,m=new i(y,s);m.castShadow=!0;n.add(m);let G=new x(10,10);const d=new i(G,s);d.material.side=g;d.position.set(0,-1,0);d.rotation.set(-Math.PI/2,0,0);d.receiveShadow=!0;n.add(d);let H=new M(16777215,.5);n.add(H);let e=new P(16777215,.5);e.castShadow=!0;e.position.set(5,5,5);e.shadow.radius=20;e.shadow.camera.near=.5;e.shadow.camera.far=500;e.shadow.camera.top=2;e.shadow.camera.bottom=-2;e.shadow.camera.left=-2;e.shadow.camera.right=2;let o=new C(e.shadow.camera),r=new j;r.add(e.shadow,"radius").min(0).max(2e3).step(1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});r.add(e.shadow.camera,"near").min(0).max(10).step(.1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});r.add(e.shadow.camera,"far").min(0).max(500).step(.1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});r.add(e.shadow.camera,"top").min(-5).max(5).step(.1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});r.add(e.shadow.camera,"bottom").min(-5).max(5).step(.1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});r.add(e.shadow.camera,"left").min(-5).max(5).step(.1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});r.add(e.shadow.camera,"right").min(-5).max(5).step(.1).onChange(()=>{e.shadow.camera.updateProjectionMatrix(),o.update()});n.add(o);n.add(e);var w=window.innerWidth,h=window.innerHeight,L=w/h,a=new b(75,L,.1,1e3);a.position.z=10;a.position.y=10;a.position.x=10;let z=new f(5);n.add(z);const t=new S;t.shadowMap.enabled=!0;t.setSize(w,h);t.render(n,a);document.body.appendChild(t.domElement);const A=new v(a,t.domElement);A.listenToKeyEvents(document.body);function c(W){t.render(n,a),requestAnimationFrame(c)}window.requestAnimationFrame(c);window.addEventListener("resize",()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});