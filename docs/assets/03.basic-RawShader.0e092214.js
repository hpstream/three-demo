import"./modulepreload-polyfill.b7f2da20.js";import{S as d,P as m,A as u,h as c,_ as w,D as v,a as x,o as g,W as p,C as h}from"./three.module.e9e6bd54.js";import{O as f}from"./OrbitControls.cacaacad.js";import{G as P}from"./dat.gui.module.6914edc7.js";var o=`precision lowp float;
attribute vec3 position;
attribute vec2 uv;


uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
varying vec2 vUv;
varying float z;


// \u83B7\u53D6\u65F6\u95F4
uniform float uTime;


void main(){
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    // modelViewMatrix  = viewMatrix * modelMatrix;
  
    modelPosition.z = sin((modelPosition.y+uTime)  * 10.0)*0.05 ;
    modelPosition.z += sin((modelPosition.y+uTime)  * 10.0)*0.05 ;
    // vElevation = modelPosition.z;
    z = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}`,t=`precision lowp float;

// \u83B7\u53D6\u65F6\u95F4
uniform float uTime;
uniform sampler2D uTexture; 
varying vec2 vUv;
varying float z;


void main(){
    
    // gl_FragColor = vec4(cos(uTime), sin(uTime), cos(uTime), 1.0);

    float height = sin((z+uTime)* 10.0)*0.05 +  1.0 ;
    vec4 textureColor = texture2D(uTexture,vUv);

    // float height = modelPosition.z + 0.05 * 20.0;
    textureColor.rgb*= height;
    // textureColor.g = 0.0;
    // textureColor.b = 0.0;
    // textureColor.r
    gl_FragColor = textureColor;
}`;console.log(o,t);new P;const i=new d,e=new m(90,window.innerHeight/window.innerHeight,.1,1e3);e.position.set(0,0,2);e.aspect=window.innerWidth/window.innerHeight;e.updateProjectionMatrix();i.add(e);const T=new u(5);i.add(T);const M=new c,C=M.load("/static/glsl/ca.jpeg"),r=new w({vertexShader:o,fragmentShader:t,side:v,uniforms:{uTime:{value:0},uTexture:{value:C}}}),a=new x(new g(1,1,1,1),r);console.log(a);i.add(a);const n=new p({alpha:!0});n.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(n.domElement);const z=new f(e,n.domElement);z.enableDamping=!0;const b=new h;function s(){const l=b.getElapsedTime();r.uniforms.uTime.value=l,requestAnimationFrame(s),n.render(i,e)}s();
