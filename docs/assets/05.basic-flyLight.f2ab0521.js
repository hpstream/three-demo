import"./modulepreload-polyfill.b7f2da20.js";import{S as w,P as h,u as v,h as u,Z as y,D as P,W as x,$ as M,a0 as C,C as f}from"./three.module.e9e6bd54.js";import{O as S}from"./OrbitControls.cacaacad.js";import{g as l}from"./index.2d9ac2c0.js";import{G as L}from"./dat.gui.module.6914edc7.js";import{R as E}from"./RGBELoader.cda76c15.js";import{G as F}from"./GLTFLoader.fddbb79f.js";var R=`precision lowp float;



varying vec4 vPosition;
varying vec4 gPosition;
void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    vPosition = modelPosition;
    gPosition = vec4( position, 1.0 );
    gl_Position =  projectionMatrix * viewMatrix * modelPosition;
    

}
`,b=`precision lowp float;
varying vec4 vPosition;
varying vec4 gPosition;

void main(){
    vec4 redColor = vec4(1,0,0,1);
    vec4 yellowColor = vec4(1, 1, 0.5, 1);
    vec4 mixColor = mix(yellowColor,redColor,gPosition.y/2.0);

    

    if(gl_FrontFacing){
        gl_FragColor = vec4(mixColor.xyz-(vPosition.y-25.0)/120.0-0.1,1);
        // gl_FragColor = vec4(1,1,1,1);
    }else{
        gl_FragColor = vec4(mixColor.xyz,1);
    }
}`;new L;const t=new w,o=new h(90,window.innerHeight/window.innerHeight,.1,1e3);o.position.set(0,0,2);o.aspect=window.innerWidth/window.innerHeight;o.updateProjectionMatrix();t.add(o);const G=new E;G.loadAsync("/static/textures/hdr/003.hdr").then(e=>{console.log(e),e.mapping=v,t.background=e,t.environment=e});const W=new u;W.load("/static/glsl/ca.jpeg");const z=new y({vertexShader:R,fragmentShader:b,side:P,uniforms:{}}),H=new F;let c=null;H.load("/static/hdr/flay-light.glb",e=>{e.scene.position.set(0,0,0),c=e.scene.children[1],c.material=z,console.log(e);for(let d=0;d<200;d++){let i=e.scene.clone(!0),p=(Math.random()-.5)*300,g=(Math.random()-.5)*300,r=Math.random()*60+25;i.position.set(p,r,g);let s=1.4-(r-25)*(r-25)/(60*60);i.scale.set(s,s,s),l.to(i.rotation,{y:2*Math.PI,duration:10+Math.random()*30,repeat:-1}),l.to(i.position,{y:"+="+Math.random()*20,yoyo:!0,duration:5+Math.random()*10,repeat:-1}),t.add(i)}});const n=new x({alpha:!0});n.outputEncoding=M;n.toneMapping=C;n.toneMappingExposure=.2;n.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(n.domElement);const a=new S(o,n.domElement);a.enableDamping=!0;a.autoRotate=!0;a.autoRotateSpeed=.2;const _=new f;function m(){_.getElapsedTime(),a.update(),requestAnimationFrame(m),n.render(t,o)}m();
