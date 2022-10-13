import"./modulepreload-polyfill.b7f2da20.js";import{S as r,P as a,A as d,Z as s,a as w,o as c,W as l,C as m}from"./three.module.e9e6bd54.js";import{O as p}from"./OrbitControls.cacaacad.js";import{G as h}from"./dat.gui.module.6914edc7.js";new h;const i=new r,e=new a(90,window.innerHeight/window.innerHeight,.1,1e3);e.position.set(0,0,2);e.aspect=window.innerWidth/window.innerHeight;e.updateProjectionMatrix();i.add(e);const g=new d(5);i.add(g);const x=new s({vertexShader:`
        void main(){
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
        }
    `,fragmentShader:`
        void main(){
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        }
  `}),o=new w(new c(1,1,64,64),x);console.log(o);i.add(o);const n=new l({alpha:!0});n.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(n.domElement);const v=new p(e,n.domElement);v.enableDamping=!0;const H=new m;function t(){H.getElapsedTime(),requestAnimationFrame(t),n.render(i,e)}t();
