import"./modulepreload-polyfill.b7f2da20.js";import{S as p,B as u,M as w,a as f,X as b,P as y,A as v,W as x,d as A}from"./three.module.e9e6bd54.js";import{O as E}from"./OrbitControls.cacaacad.js";let a=new p,H=new u(1,1,1),c=[];const M=new w({color:16777215,wireframe:!0});for(let t=-5;t<5;t++)for(let i=-5;i<5;i++)for(let o=-5;o<5;o++){const r=new f(H,M);r.position.set(t,i,o),a.add(r),c.push(r)}const d=new b,s=new A;window.addEventListener("click",t=>{const i=new w({color:"#ff0000"});s.x=t.clientX/window.innerWidth*2-1,s.y=-(t.clientY/window.innerHeight*2-1),d.setFromCamera(s,e),d.intersectObjects(c).forEach(r=>{r.object.material=i})});var l=window.innerWidth,m=window.innerHeight,W=l/m,e=new y(75,W,.1,1e3);e.position.z=15;e.position.y=15;e.position.x=15;let g=new v(5);a.add(g);const n=new x;n.setSize(l,m);e.lookAt(0,0,0);n.render(a,e);document.body.appendChild(n.domElement);const z=new E(e,n.domElement);z.listenToKeyEvents(document.body);function h(t){n.render(a,e),requestAnimationFrame(h)}window.requestAnimationFrame(h);window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});
