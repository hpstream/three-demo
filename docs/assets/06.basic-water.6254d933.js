import"./modulepreload-polyfill.b7f2da20.js";import{S as d,P as m,A as v,Z as f,D as x,g as u,a as p,o as g,W as y,$ as w,a0 as h,C as S}from"./three.module.e9e6bd54.js";import{O as C}from"./OrbitControls.cacaacad.js";import{G as P}from"./dat.gui.module.6914edc7.js";var F=`precision lowp float;
uniform float uWaresFrequency;
uniform float uScale;
uniform float uNoiseFrequency;
uniform float uNoiseScale;
uniform float uXzScale;
uniform float uTime;
uniform float uXspeed;
uniform float uZspeed;
uniform float uNoiseSpeed;

// \u8BA1\u7B97\u51FA\u7684\u9AD8\u5EA6\u4F20\u9012\u7ED9\u7247\u5143\u7740\u8272\u5668
varying float vElevation;

// \u968F\u673A\u51FD\u6570
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// \u65CB\u8F6C\u51FD\u6570
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

// \u566A\u58F0\u51FD\u6570
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

     float elevation = sin(modelPosition.x*uWaresFrequency+uTime*uXspeed)*sin(modelPosition.z*uWaresFrequency*uXzScale+uTime*uZspeed);

    elevation += -abs(cnoise(vec2(modelPosition.xz*uNoiseFrequency+uTime*uNoiseSpeed))) *uNoiseScale;
    
    vElevation = elevation;
    
    elevation *= uScale;

    

    modelPosition.y += elevation;


    gl_Position =  projectionMatrix * viewMatrix * modelPosition;
    

}
`,N=`precision lowp float;

uniform vec3 uHighColor;
uniform vec3 uLowColor;
varying float vElevation;
uniform float uOpacity;

void main(){
    float a = (vElevation+1.0)/2.0;
    vec3 color = mix(uLowColor,uHighColor,a);
    gl_FragColor = vec4(color,uOpacity);
}`;const i=new P,r=new d,t=new m(90,window.innerHeight/window.innerHeight,.1,1e3);t.position.set(0,0,2);t.aspect=window.innerWidth/window.innerHeight;t.updateProjectionMatrix();r.add(t);const z=new v(5);r.add(z);const n={uWaresFrequency:14,uScale:.03,uXzScale:1.5,uNoiseFrequency:10,uNoiseScale:1.5,uLowColor:"#ff0000",uHighColor:"#ffff00",uXspeed:1,uTime:0,uZspeed:1,uNoiseSpeed:1,uOpacity:1},o=new f({vertexShader:F,fragmentShader:N,side:x,uniforms:{uWaresFrequency:{value:n.uWaresFrequency},uScale:{value:n.uScale},uNoiseFrequency:{value:n.uNoiseFrequency},uNoiseScale:{value:n.uNoiseScale},uXzScale:{value:n.uXzScale},uTime:{value:n.uTime},uLowColor:{value:new u(n.uLowColor)},uHighColor:{value:new u(n.uHighColor)},uXspeed:{value:n.uXspeed},uZspeed:{value:n.uZspeed},uNoiseSpeed:{value:n.uNoiseSpeed},uOpacity:{value:n.uOpacity}},transparent:!0});i.add(n,"uWaresFrequency").min(1).max(100).step(.1).onChange(e=>{o.uniforms.uWaresFrequency.value=e});i.add(n,"uScale").min(0).max(.2).step(.001).onChange(e=>{o.uniforms.uScale.value=e});i.add(n,"uNoiseFrequency").min(1).max(100).step(.1).onChange(e=>{o.uniforms.uNoiseFrequency.value=e});i.add(n,"uNoiseScale").min(0).max(5).step(.001).onChange(e=>{o.uniforms.uNoiseScale.value=e});i.add(n,"uXzScale").min(0).max(5).step(.1).onChange(e=>{o.uniforms.uXzScale.value=e});i.addColor(n,"uLowColor").onFinishChange(e=>{o.uniforms.uLowColor.value=new u(e)});i.addColor(n,"uHighColor").onFinishChange(e=>{o.uniforms.uHighColor.value=new u(e)});i.add(n,"uXspeed").min(0).max(5).step(.001).onChange(e=>{o.uniforms.uXspeed.value=e});i.add(n,"uZspeed").min(0).max(5).step(.001).onChange(e=>{o.uniforms.uZspeed.value=e});i.add(n,"uNoiseSpeed").min(0).max(5).step(.001).onChange(e=>{o.uniforms.uNoiseSpeed.value=e});i.add(n,"uOpacity").min(0).max(1).step(.01).onChange(e=>{o.uniforms.uOpacity.value=e});const s=new p(new g(1,1,512,512),o);s.rotateX(-Math.PI/2);console.log(s);r.add(s);const a=new y({alpha:!0});a.outputEncoding=w;a.toneMapping=h;a.toneMappingExposure=.2;a.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(a.domElement);const c=new C(t,a.domElement);c.enableDamping=!0;const q=new S;function l(){const e=q.getElapsedTime();o.uniforms.uTime.value=e,c.update(),requestAnimationFrame(l),a.render(r,t)}l();
