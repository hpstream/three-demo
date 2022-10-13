import"./modulepreload-polyfill.b7f2da20.js";import{S as l,P as m,A as u,h as c,_ as w,D as v,d as h,a as p,o as g,W as x,C as f}from"./three.module.e9e6bd54.js";import{O as _}from"./OrbitControls.cacaacad.js";import{G as M}from"./dat.gui.module.6914edc7.js";var o=`precision lowp float;
attribute vec3 position;
attribute vec2 uv;


uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
varying vec2 v_uv;


void main(){
    v_uv = uv;

    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}`,r=`precision lowp float;

// \u83B7\u53D6\u65F6\u95F4
uniform float uTime;
uniform sampler2D uTexture; 
uniform vec2 u_resolution;
varying vec2 v_uv;




void main(){
    float strength = step(0.2,v_uv.x-0.2) ;
    strength *= step(0.2, v_uv.y) ;

    gl_FragColor = vec4(strength,strength,strength,1.0);
}`;console.log(o,r);new M;const i=new l,n=new m(90,window.innerHeight/window.innerHeight,.1,1e3);n.position.set(0,0,2);n.aspect=window.innerWidth/window.innerHeight;n.updateProjectionMatrix();i.add(n);const P=new u(5);i.add(P);const S=new c,b=S.load("/static/glsl/ca.jpeg"),t=new w({vertexShader:o,fragmentShader:r,side:v,uniforms:{u_time:{value:0},u_resolution:{value:new h},uTexture:{value:b}}}),a=new p(new g(2,2),t);console.log(a);i.add(a);const e=new x({alpha:!0});e.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio),t.uniforms.u_resolution.value.x=e.domElement.width,t.uniforms.u_resolution.value.y=e.domElement.height,console.log(e.domElement.width,e.domElement.height)});document.body.appendChild(e.domElement);const E=new _(n,e.domElement);E.enableDamping=!0;const H=new f;function s(){const d=H.getElapsedTime();t.uniforms.u_time.value=d,requestAnimationFrame(s),e.render(i,n)}s();
