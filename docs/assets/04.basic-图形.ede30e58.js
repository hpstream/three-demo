import"./modulepreload-polyfill.b7f2da20.js";import{S as h,P as c,A as i,h as f,Z as d,D as x,a as U,o as m,W as y,C as u}from"./three.module.e9e6bd54.js";import{O as p}from"./OrbitControls.cacaacad.js";import{G as C}from"./dat.gui.module.6914edc7.js";var g=`precision lowp float;

varying vec2 vUv;

// \u83B7\u53D6\u65F6\u95F4
uniform float uTime;


void main(){
    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );;
}`,o=`precision lowp float;

// Vuv\u7684\u5750\u6807\u662F
varying vec2 vUv;
// \u83B7\u53D6\u65F6\u95F4
uniform float uTime;
uniform float uScale;

#define PI 3.1415926535897932384626433832795
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

void main() {
    // 1\u901A\u8FC7\u9876\u70B9\u5BF9\u5E94\u7684uv\uFF0C\u51B3\u5B9A\u6BCF\u4E00\u4E2A\u50CF\u7D20\u5728uv\u56FE\u50CF\u7684\u4F4D\u7F6E\uFF0C\u901A\u8FC7\u8FD9\u4E2A\u4F4D\u7F6Ex,y\u51B3\u5B9A\u989C\u8272
    //gl_FragColor =vec4(vUv,0,1) ;

    // 2\u5BF9\u7B2C\u4E00\u79CD\u53D8\u5F62
    // gl_FragColor = vec4(vUv,1,1);

    // 3.\u5229\u7528uv\u5B9E\u73B0\u9010\u6E10\u6548\u679C\uFF0C\u5B9E\u73B0\u4ECE\u5DE6\u5230\u53F3, [0,1]
    //float strength = vUv.x;
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 4.\u5229\u7528uv\u5B9E\u73B0\u6548\u679C\u9010\u6E10\u6E10\u53D8\uFF0C\u4ECE\u4E0B\u5230\u4E0A, [1,0]
    // float strength = vUv.y;
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 5.\u5229\u7528uv\u5B9E\u73B0\u6548\u679C\u9010\u6E10\u6E10\u53D8\uFF0C\u4ECE\u4E0A\u5230\u4E0B, [0,1]
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 6.\u5229\u7528uv\u5B9E\u73B0\u77ED\u8303\u56F4\u5185\u7684\u6E10\u53D8[0,1];
    // float strength = vUv.y * 10.0; // \u4E58\u4EE510\u533A\u95F4 [0,10], \u5927\u4E8E1\u7684\u90E8\u5206\u4ECD\u7136\u4E3A\u767D\u8272\uFF1B
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 7.\u5229\u7528\u53D6\u6A21\u8FBE\u5230\u53CD\u590D\u6E10\u53D8\u7684\u6548\u679C
    // float strength = mod(vUv.y * 10.0, 1.0); // \u4E58\u4EE510\u533A\u95F4 [[0,1],[0,1],....], \u5927\u4E8E1\u7684\u90E8\u5206\u4ECD\u7136\u4E3A\u767D\u8272\uFF1B
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 8.\u4F7F\u7528step(edge,x)\u5982\u679Cx<edge,\u8FD4\u56DE0.0\uFF0C\u5426\u5219\u8FD4\u56DE1.0\uFF1B
    // float strength = mod(vUv.y*10.0,1.0);
    // strength = step(0.5,strength); // \u975E\u9ED1\u5373\u767D\u7684\u989C\u8272
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 9.\u4F7F\u7528step(edge,x)\u5982\u679Cx<edge,\u8FD4\u56DE0.0\uFF0C\u5426\u5219\u8FD4\u56DE1.0\uFF1B
    // float strength = mod(vUv.y*10.0,1.0);
    // strength = step(0.8,strength); // \u975E\u9ED1\u5373\u767D\u7684\u989C\u8272
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 10.\u4F7F\u7528step(edge,x)\u5982\u679Cx<edge,\u8FD4\u56DE0.0\uFF0C\u5426\u5219\u8FD4\u56DE1.0\uFF1B
    // float strength = mod(vUv.x*10.0,1.0);
    // strength = step(0.8,strength); // \u975E\u9ED1\u5373\u767D\u7684\u989C\u8272
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 11 \u6761\u7EB9\u76F8\u52A0
    // float strength = step(0.8, mod(vUv.x * 10.0 , 1.0)) ;
    // strength += step(0.8, mod(vUv.y * 10.0 , 1.0)) ;

    // 12\u6761\u7EB9\u76F8\u4E58
    // float strength = step(0.8, mod(vUv.x * 10.0 , 1.0)) ;
    // strength *= step(0.8, mod(vUv.y * 10.0 , 1.0)) ;

    // 12\u6761\u7EB9\u76F8\u51CF
    // float strength = step(0.8, mod(vUv.x * 10.0 , 1.0)) ;
    // strength -= step(0.8, mod(vUv.y * 10.0 , 1.0)) ;

    // 13\u65B9\u5757\u56FE\u5F62
    // float strength = step(0.2, mod(vUv.x * 10.0 , 1.0)) ;
    // strength *= step(0.2, mod(vUv.y * 10.0 , 1.0)) ;

    // 14 T\u56FE\u5F62\uFF1B
    // float barX = step(0.4, mod((vUv.x+uTime*0.1) * 10.0 , 1.0))*step(0.8, mod(vUv.y * 10.0 , 1.0)) ;
    // float barX = step(0.4, mod(vUv.x * 10.0-0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 16 \u5229\u7528\u7EDD\u5BF9\u503C
    // float strength = abs(vUv.x - 0.5) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 17 \u5229\u7528\u7EDD\u5BF9\u503C
    // float strength = min(abs(vUv.x - 0.5),abs(vUv.y - 0.5)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 18 \u53D6\u6700\u5927\u503C
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))  ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 19 step
    // float strength =step(0.2,max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 20 \u5C0F\u6B63\u65B9\u5F62
    // float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 21 \u5229\u7528\u53D6\u6574\uFF0C\u5B9E\u73B0\u6761\u7EB9\u6E10\u53D8 
    // float strength = floor(vUv.x*10.0)/10.0;
    // gl_FragColor =vec4(strength,strength,strength,1);
    // float strength = floor(vUv.y*10.0)/10.0;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 22\u6761\u7EB9\u76F8\u4E58\uFF0C\u5B9E\u73B0\u6E10\u53D8\u683C\u5B50
    // float strength = floor(vUv.x*10.0)/10.0*floor(vUv.y*10.0)/10.0;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 23\u5411\u4E0A\u53D6\u6574
    // float strength = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 24\u968F\u673A\u6548\u679C
    // float strength = random(vUv);
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 24\u968F\u673A+\u683C\u5B50\u6548\u679C
    // float strength = ceil(vUv.x*10.0)/10.0*ceil(vUv.y*10.0)/10.0;
    // strength = random(vec2(strength,strength));
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 25 \u4F9D\u636Elength\u8FD4\u56DE\u5411\u91CF\u957F\u5EA6
    // float strength = length(vUv);
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 26 \u6839\u636Edistance\u6280\u672F2\u4E2A\u5411\u91CF\u7684\u8DDD\u79BB
    // float strength =1.0 - distance(vUv,vec2(0.5,0.5));
    // gl_FragColor = vec4(strength,strength,strength,1);

    // 27\u6839\u636E\u76F8\u9664\uFF0C\u5B9E\u73B0\u661F\u661F
    // float strength =0.15 / distance(vUv,vec2(0.5,0.5)) - 1.0;
    // gl_FragColor =vec4(strength,strength,strength,strength);

    // 28\u8BBE\u7F6EvUv\u6C34\u5E73\u6216\u8005\u7AD6\u76F4\u53D8\u91CF
    // float strength =0.15 / distance(vec2(vUv.x,(vUv.y-0.5)*5.0),vec2(0.5,0.5)) - 1.0;
    // gl_FragColor =vec4(strength,strength,strength,1);

     // 29\u5341\u5B57\u4EA4\u53C9\u7684\u661F\u661F
    // float  strength = 0.15 / distance(vec2(vUv.x,(vUv.y-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
    // strength += 0.15 / distance(vec2(vUv.y,(vUv.x-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
    // gl_FragColor =vec4(strength,strength,strength,strength);

      // 29\u65CB\u8F6C\u98DE\u9556\uFF0C\u65CB\u8F6Cuv
    // vec2 rotateUv = rotate(vUv,3.14*0.25,vec2(0.5));
    // vec2 rotateUv = rotate(vUv,-uTime*5.0,vec2(0.5));
    // float  strength = 0.15 / distance(vec2(rotateUv.x,(rotateUv.y-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
    // strength += 0.15 / distance(vec2(rotateUv.y,(rotateUv.x-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
    // gl_FragColor =vec4(strength,strength,strength,strength);

    // 31\u7ED8\u5236\u5706
    // float strength = 1.0 - step(0.5,distance(vUv,vec2(0.5))+0.25) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 32\u5706\u73AF
    // float strength = 1.0 - step(0.5,distance(vUv,vec2(0.5,0.5))) ;
    // strength *=  step(0.4,distance(vUv,vec2(0.5,0.5)));
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 34\u6E10\u53D8\u73AF
    // float strength = abs(distance(vUv,vec2(0.5))-0.2) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 35\u6253\u9776
    // float strength = step(0.1,abs(distance(vUv,vec2(0.5))-0.25));
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 36\u5706\u73AF
    // float strength = 1.0 - step(0.1,abs(distance(vUv,vec2(0.5))-0.25)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 37\u6CE2\u6D6A\u73AF
    // vec2 waveUv = vec2(
    //     vUv.x,
    //     vUv.y+sin(vUv.x*30.0)*0.1
    // );
    // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25))   ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 38
    // vec2 waveUv = vec2(
    //     vUv.x+sin(vUv.y*30.0)*0.1,
    //     vUv.y+sin(vUv.x*30.0)*0.1
    // );
    // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25))   ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 39
    // vec2 waveUv = vec2(
    //     vUv.x+sin(vUv.y*100.0)*0.1,
    //     vUv.y+sin(vUv.x*100.0)*0.1
    // );
    // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25))   ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 40 \u6839\u636E\u89D2\u5EA6\u663E\u793A\u89C6\u56FE
    // float angle = atan(vUv.x,vUv.y);
    // float strength = angle;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 41 \u6839\u636E\u89D2\u5EA6\u5B9E\u73B0\u87BA\u65CB\u6E10\u53D8
    // float angle = atan(vUv.x-0.5,vUv.y-0.5);
    // float strength = (angle+3.14)/6.28;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 42 \u5B9E\u73B0\u96F7\u8FBE\u626B\u5C04
    // float alpha =  1.0 - step(0.5,distance(vUv,vec2(0.5)));
    // float angle = atan(vUv.x-0.5,vUv.y-0.5);
    // float strength = (angle+3.14)/6.28;
    // gl_FragColor =vec4(strength,strength,strength,alpha);

    // 43 \u901A\u8FC7\u65F6\u95F4\u5B9E\u73B0\u52A8\u6001\u9009\u62E9
    // vec2 rotateUv = rotate(vUv,3.14*0.25,vec2(0.5));
    // vec2 rotateUv = rotate(vUv,-uTime*5.0,vec2(0.5));
    // float alpha =  1.0 - step(0.5,distance(vUv,vec2(0.5)));
    // float angle = atan(rotateUv.x-0.5,rotateUv.y-0.5);
    // float strength = (angle+3.14)/6.28;
    // gl_FragColor =vec4(strength,strength,strength,alpha);

    // 44 \u4E07\u82B1\u7B52 [-PI/2,PI/2] 
    // float angle = atan(vUv.x-0.5,vUv.y-0.5)/PI;
    // float strength = mod(angle*10.0,1.0);

    // gl_FragColor =vec4(strength,strength,strength,1);

    // 45 \u5149\u8292\u56DB\u5C04
    // float angle = atan(vUv.x-0.5,vUv.y-0.5)/(2.0*PI);
    // float strength = sin(angle*100.0);
    // gl_FragColor =vec4(strength,strength,strength,1);


    // 46 \u4F7F\u7528\u566A\u58F0\u5B9E\u73B0\u70DF\u96FE\u3001\u6CE2\u7EB9\u6548\u679C
    // float strength = noise(vUv);
    // gl_FragColor =vec4(strength,strength,strength,1);

    // float strength = noise(vUv * 10.0);
    // gl_FragColor =vec4(strength,strength,strength,1);


    // float strength = step(0.5,noise(vUv * 100.0)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // \u901A\u8FC7\u65F6\u95F4\u8BBE\u7F6E\u6CE2\u5F62
    // float strength = step(uScale,cnoise(vUv * 10.0+uTime)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // float strength = abs(cnoise(vUv * 20.0)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);


    // \u53D1\u5149\u8DEF\u5F84
    // vec2  rValue = rotate(vUv,random(vUv),vec2(0.5));
    // float strength = 1.0 - abs(cnoise(vUv * 10.0)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);


    // \u6CE2\u7EB9\u6548\u679C
    // float strength = tan(cnoise(vUv * 10.0)*5.0+uTime) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // float strength = step(0.5,sin(cnoise(vUv * 10.0)*20.0))  ;
    // gl_FragColor =vec4(strength,strength,strength,1);

     // \u4F7F\u7528\u6DF7\u5408\u51FD\u6570\u6DF7\u989C\u8272
    vec3 purpleColor = vec3(1.0, 0.0, 1.0);
    vec3 greenColor = vec3(1.0, 1.0, 1.0);
    vec3 uvColor = vec3(vUv,1.0);
    float strength = step(0.9,sin(cnoise(vUv * 10.0)*20.0+uTime))  ;


    vec3 mixColor =  mix(greenColor,uvColor,strength);
    // gl_FragColor =vec4(mixColor,1.0);
    gl_FragColor =vec4(mixColor,1.0);



}
`;console.log(g,o);const _=new C,e=new h,n=new c(90,window.innerHeight/window.innerHeight,.1,1e3);n.position.set(0,0,2);n.aspect=window.innerWidth/window.innerHeight;n.updateProjectionMatrix();e.add(n);const F=new i(5);e.add(F);new f;const s={uFrequency:10,uScale:.1},v=new d({vertexShader:g,fragmentShader:o,side:x,uniforms:{uTime:{value:0},uScale:{value:s.uScale}}});_.add(s,"uScale").min(0).max(1).step(.01).onChange(r=>{v.uniforms.uScale.value=r});const a=new U(new m(1,1,1,1),v);console.log(a);e.add(a);const t=new y({alpha:!0});t.setSize(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(window.devicePixelRatio)});document.body.appendChild(t.domElement);const w=new p(n,t.domElement);w.enableDamping=!0;const b=new u;function l(){const r=b.getElapsedTime();v.uniforms.uTime.value=r,requestAnimationFrame(l),t.render(e,n)}l();
