var T=Object.defineProperty;var L=(o,t,e)=>t in o?T(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var n=(o,t,e)=>(L(o,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{g as _,e as P,f as u,Z as v,O as S,K as k,C as A,aJ as x,aK as C,aL as E,S as W,P as R,D as B,u as H,o as j,W as I,$ as V,a0 as $}from"./three.module.e9e6bd54.js";import{O as D}from"./OrbitControls.cacaacad.js";import{g as F}from"./index.2d9ac2c0.js";import{G as O}from"./dat.gui.module.6914edc7.js";import{R as q}from"./RGBELoader.cda76c15.js";import{G as K}from"./GLTFLoader.fddbb79f.js";import{W as J}from"./Water2.b0b9afa2.js";var U=`precision lowp float;



varying vec4 vPosition;
varying vec4 gPosition;
void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    vPosition = modelPosition;
    gPosition = vec4( position, 1.0 );
    gl_Position =  projectionMatrix * viewMatrix * modelPosition;
    

}

`,Z=`precision lowp float;
varying vec4 vPosition;
varying vec4 gPosition;

void main(){
    vec4 redColor = vec4(1,0,0,1);
    vec4 yellowColor = vec4(1,1,0.5,1);
    vec4 mixColor = mix(yellowColor,redColor,gPosition.y/3.0);

    

    if(gl_FrontFacing){
        gl_FragColor = vec4(mixColor.xyz-(vPosition.y-20.0)/80.0-0.1,1);
        // gl_FragColor = vec4(1,1,1,1);
    }else{
        gl_FragColor = vec4(mixColor.xyz,1);
    }
}`,N=`
uniform vec3 uColor;
void main(){
    float distanceToCenter = distance(gl_PointCoord,vec2(0.5));
    float strength = distanceToCenter*2.0;
    strength = 1.0-strength;
    strength = pow(strength,1.5);
    gl_FragColor = vec4(uColor,strength);
}`,Q=`
attribute vec3 aStep;

uniform float uTime;
uniform float uSize;
void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    modelPosition.xyz += (aStep*uTime);

    vec4 viewPosition = viewMatrix * modelPosition;

    

    gl_Position =  projectionMatrix * viewPosition;

    // \u8BBE\u7F6E\u9876\u70B9\u5927\u5C0F
    gl_PointSize =uSize;
    
}`,X=`
uniform vec3 uColor;
void main(){
    float distanceToCenter = distance(gl_PointCoord,vec2(0.5));
    float strength = distanceToCenter*2.0;
    strength = 1.0-strength;
    strength = pow(strength,1.5);
    gl_FragColor = vec4(uColor,strength);
}`,Y=`
attribute float aScale;
attribute vec3 aRandom;


uniform float uTime;
uniform float uSize;
void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    modelPosition.xyz+=aRandom*uTime*10.0;

    modelPosition.y -= uTime*0.9;

    vec4 viewPosition = viewMatrix * modelPosition;

    

    gl_Position =  projectionMatrix * viewPosition;

    // \u8BBE\u7F6E\u9876\u70B9\u5927\u5C0F
    gl_PointSize =uSize*aScale-(uTime*20.0);
    
}`;class ee{constructor(t,e,s={x:0,y:0,z:0}){n(this,"color");n(this,"startGeometry");n(this,"startMaterial");n(this,"startPoint");n(this,"clock");n(this,"fireworkGeometry");n(this,"FireworksCount");n(this,"fireworksMaterial");n(this,"fireworks");n(this,"linstener");n(this,"linstener1");n(this,"sound");n(this,"sendSound");n(this,"scene");n(this,"sendSoundplay");n(this,"play");this.color=new _(t),this.startGeometry=new P;const d=new Float32Array(3);d[0]=s.x,d[1]=s.y,d[2]=s.z,this.startGeometry.setAttribute("position",new u(d,3));const h=new Float32Array(3);h[0]=e.x-s.x,h[1]=e.y-s.y,h[2]=e.z-s.x,this.startGeometry.setAttribute("aStep",new u(h,3)),this.startMaterial=new v({vertexShader:Q,fragmentShader:N,transparent:!0,blending:S,depthWrite:!1,uniforms:{uTime:{value:0},uSize:{value:20},uColor:{value:this.color}}}),this.startPoint=new k(this.startGeometry,this.startMaterial),this.clock=new A,this.fireworkGeometry=new P,this.FireworksCount=180+Math.floor(Math.random()*180);const c=new Float32Array(this.FireworksCount*3),y=new Float32Array(this.FireworksCount),w=new Float32Array(this.FireworksCount*3);for(let i=0;i<this.FireworksCount;i++){c[i*3+0]=e.x,c[i*3+1]=e.y,c[i*3+2]=e.z,y[i]=Math.random();let p=Math.random()*2*Math.PI,f=Math.random()*2*Math.PI,m=Math.random();w[i*3+0]=m*Math.sin(p)+m*Math.sin(f),w[i*3+1]=m*Math.cos(p)+m*Math.cos(f),w[i*3+2]=m*Math.sin(p)+m*Math.cos(f)}this.fireworkGeometry.setAttribute("position",new u(c,3)),this.fireworkGeometry.setAttribute("aScale",new u(y,1)),this.fireworkGeometry.setAttribute("aRandom",new u(w,3)),this.fireworksMaterial=new v({uniforms:{uTime:{value:0},uSize:{value:0},uColor:{value:this.color}},transparent:!0,blending:S,depthWrite:!1,vertexShader:Y,fragmentShader:X}),this.fireworks=new k(this.fireworkGeometry,this.fireworksMaterial),this.linstener=new x,this.linstener1=new x,this.sound=new C(this.linstener),this.sendSound=new C(this.linstener1);const M=new E;M.load(`./assets/audio/pow${Math.floor(Math.random()*4)+1}.ogg`,i=>{this.sound.setBuffer(i),this.sound.setLoop(!1),this.sound.setVolume(1)}),M.load("./assets/audio/send.mp3",i=>{this.sendSound.setBuffer(i),this.sendSound.setLoop(!1),this.sendSound.setVolume(1)})}addScene(t,e){t.add(this.startPoint),t.add(this.fireworks),this.scene=t}update(){const t=this.clock.getElapsedTime();if(t>.2&&t<1)!this.sendSound.isPlaying&&!this.sendSoundplay&&(this.sendSound.play(),this.sendSoundplay=!0),this.startMaterial.uniforms.uTime.value=t,this.startMaterial.uniforms.uSize.value=20;else if(t>.2){const e=t-1;if(this.startMaterial.uniforms.uSize.value=0,this.startPoint.clear(),this.startGeometry.dispose(),this.startMaterial.dispose(),!this.sound.isPlaying&&!this.play&&(this.sound.play(),this.play=!0),this.fireworksMaterial.uniforms.uSize.value=20,this.fireworksMaterial.uniforms.uTime.value=e,e>2)return this.fireworksMaterial.uniforms.uSize.value=0,this.fireworks.clear(),this.fireworkGeometry.dispose(),this.fireworksMaterial.dispose(),this.scene.remove(this.fireworks),this.scene.remove(this.startPoint),"remove"}}}new O;const l=new W,r=new R(90,window.innerHeight/window.innerHeight,.1,1e3);r.position.set(30,30,2);r.aspect=window.innerWidth/window.innerHeight;r.updateProjectionMatrix();l.add(r);const te=new v({vertexShader:U,fragmentShader:Z,uniforms:{},side:B}),oe=new q;oe.loadAsync("./assets/2k.hdr").then(o=>{o.mapping=H,l.background=o,l.environment=o});const G=new K;let z=null;G.load("./assets/model/flyLight.glb",o=>{console.log(o),z=o.scene.children[0],z.material=te;for(let t=0;t<150;t++){let e=o.scene.clone(!0),s=(Math.random()-.5)*300,d=(Math.random()-.5)*300,h=Math.random()*60+5;e.position.set(s,h,d),F.to(e.rotation,{y:2*Math.PI,duration:10+Math.random()*30,repeat:-1}),F.to(e.position,{x:"+="+Math.random()*5,y:"+="+Math.random()*20,yoyo:!0,duration:5+Math.random()*10,repeat:-1}),l.add(e)}});G.load("./assets/model/newyears_min.glb",o=>{console.log(o),l.add(o.scene),console.log(o.scene,"1");const t=new j(100,100);let e=new J(t,{scale:4,textureHeight:1024,textureWidth:1024});e.position.y=1,e.rotation.x=-Math.PI/2,l.add(e)});const a=new I({alpha:!0});a.outputEncoding=V;a.toneMapping=$;a.toneMappingExposure=.4;a.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(a.domElement);const ne=new D(r,a.domElement);ne.enableDamping=!0;const ie=new A;let g=[];function b(){ie.getElapsedTime(),g.forEach((o,t)=>{o.update()=="remove"&&g.splice(t,1)}),requestAnimationFrame(b),a.render(l,r)}b();let re=()=>{let o=`hsl(${Math.floor(Math.random()*360)},100%,80%)`,t={x:(Math.random()-.5)*40,z:-(Math.random()-.5)*40,y:40+Math.random()*15},e=new ee(o,t);e.addScene(l,r),g.push(e)};window.addEventListener("click",re);
