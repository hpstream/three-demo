import"./modulepreload-polyfill.b7f2da20.js";import{S as I,P as A,A as S,h as _,g as C,W as F,e as z,f as g,Z as H,O as D,K as W,C as G}from"./three.module.e9e6bd54.js";import{O}from"./OrbitControls.cacaacad.js";import{G as E}from"./dat.gui.module.6914edc7.js";var f=`attribute float imgIndex;
attribute float aScale;
uniform float uTime;
varying float vImgIndex;
varying vec2 vUv;
varying vec3 vColor; 
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        // \u83B7\u53D6\u5B9A\u70B9\u7684\u89D2\u5EA6
    float angle = atan(modelPosition.x,modelPosition.z);
    // \u83B7\u53D6\u9876\u70B9\u5230\u4E2D\u5FC3\u7684\u8DDD\u79BB
    float distanceToCenter = length(modelPosition.xz);
    // \u6839\u636E\u9876\u70B9\u5230\u4E2D\u5FC3\u7684\u8DDD\u79BB\uFF0C\u8BBE\u7F6E\u65CB\u8F6C\u504F\u79FB\u5EA6\u6570
    float angleOffset = 1.0/distanceToCenter*uTime;
    // \u76EE\u524D\u65CB\u8F6C\u7684\u5EA6\u6570
    angle+=angleOffset;

    modelPosition.x = cos(angle)*distanceToCenter;
    modelPosition.z = sin(angle)*distanceToCenter;
    vec4 viewPositon = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPositon;
    // \u8BBE\u7F6E\u70B9\u7684\u5927\u5C0F
    gl_PointSize = 200.0 / -viewPositon.z * aScale;
    vImgIndex = imgIndex;
    vUv = uv;
    vColor = color;
}`,P=`
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
varying float vImgIndex;
varying vec3 vColor;
void main(){
    // \u8BBE\u7F6E\u6E10\u53D8\u5706
    // float strength = distance(gl_PointCoord,vec2(0.5));
    // strength*=2.0;
    // strength = 1.0-strength;
    // gl_FragColor = vec4(strength);

    // \u5706\u5F62\u70B9
    // float strength = 1.0-distance(gl_PointCoord,vec2(0.5));
    // // strength = 1.0- step(0.5,strength);
    // gl_FragColor = vec4(strength);

    // \u6839\u636E\u7EB9\u7406\u8BBE\u7F6E\u56FE\u6848
    vec4 textureColor;
    if(vImgIndex==0.0){
       textureColor = texture2D(uTexture,gl_PointCoord);
    }else if(vImgIndex==1.0){
       textureColor = texture2D(uTexture1,gl_PointCoord);
    }else{
       textureColor = texture2D(uTexture2,gl_PointCoord);
    }
    // gl_FragColor = vec4(textureColor.rgb,textureColor.r);
    // gl_FragColor = vec4(gl_PointCoord,1.0,textureColor.r);

   gl_FragColor = vec4(vColor,textureColor.r) ;
}`;console.log(f,P);new E;const d=new I,n=new A(90,window.innerHeight/window.innerHeight,.1,1e3);n.position.set(0,0,2);n.aspect=window.innerWidth/window.innerHeight;n.updateProjectionMatrix();d.add(n);const L=new S(5);d.add(L);const v=new _,U=v.load("./particles/10.png"),j=v.load("./particles/9.png"),B=v.load("./particles/8.png"),e={count:1e3,size:.1,radius:5,branches:4,spin:.5,color:"#ff6030",outColor:"#1b3984"};let p=new C(e.color),R=new C(e.outColor),o=null,l=null,m;const k=()=>{l!==null&&(o.dispose(),m.dispose(),d.remove(l)),o=new z;const r=new Float32Array(e.count*3),c=new Float32Array(e.count*3),x=new Float32Array(e.count),w=new Float32Array(e.count);for(let t=0;t<e.count;t++){const a=t*3,h=t%e.branches*(2*Math.PI/e.branches),i=Math.random()*e.radius,T=Math.pow(Math.random()*2-1,3)*.5*(e.radius-i)*.3,M=Math.pow(Math.random()*2-1,3)*.5*(e.radius-i)*.3,y=Math.pow(Math.random()*2-1,3)*.5*(e.radius-i)*.3;r[a]=Math.cos(h)*i+T,r[a+1]=M,r[a+2]=Math.sin(h)*i+y;const u=p.clone();u.lerp(R,i/e.radius),c[a]=u.r,c[a+1]=u.g,c[a+2]=u.b,x[t]=Math.random(),w[t]=t%3}o.setAttribute("position",new g(r,3)),o.setAttribute("color",new g(c,3)),o.setAttribute("aScale",new g(x,1)),o.setAttribute("imgIndex",new g(w,1)),m=new H({vertexShader:f,fragmentShader:P,transparent:!0,vertexColors:!0,blending:D,depthWrite:!1,uniforms:{uTime:{value:0},uTexture:{value:U},uTexture1:{value:j},uTexture2:{value:B},uColor:{value:p}}}),l=new W(o,m),d.add(l),console.log(l),console.log(l)};k();const s=new F({alpha:!0});s.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight),s.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(s.domElement);const Z=new O(n,s.domElement);Z.enableDamping=!0;const q=new G;function b(){const r=q.getElapsedTime();m.uniforms.uTime.value=r,requestAnimationFrame(b),s.render(d,n)}b();
