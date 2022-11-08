import{v as H,H as B,F as w,w as G,x as V,L as M}from"./three.module.e9e6bd54.js";class Y extends H{constructor(g){super(g),this.type=B}parse(g){const _=function(r,t){switch(r){case 1:console.error("THREE.RGBELoader Read Error: "+(t||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(t||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(t||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(t||""))}return-1},S=`
`,A=function(r,t,s){t=t||1024;let i=r.pos,n=-1,e=0,l="",a=String.fromCharCode.apply(null,new Uint16Array(r.subarray(i,i+128)));for(;0>(n=a.indexOf(S))&&e<t&&i<r.byteLength;)l+=a,e+=a.length,i+=128,a+=String.fromCharCode.apply(null,new Uint16Array(r.subarray(i,i+128)));return-1<n?(s!==!1&&(r.pos+=e+n+1),l+a.slice(0,n)):!1},U=function(r){const t=/^#\?(\S+)/,s=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,i=/^\s*FORMAT=(\S+)\s*$/,n=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,e={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let l,a;if(r.pos>=r.byteLength||!(l=A(r)))return _(1,"no header found");if(!(a=l.match(t)))return _(3,"bad initial token");for(e.valid|=1,e.programtype=a[1],e.string+=l+`
`;l=A(r),l!==!1;){if(e.string+=l+`
`,l.charAt(0)==="#"){e.comments+=l+`
`;continue}if((a=l.match(s))&&(e.gamma=parseFloat(a[1])),(a=l.match(o))&&(e.exposure=parseFloat(a[1])),(a=l.match(i))&&(e.valid|=2,e.format=a[1]),(a=l.match(n))&&(e.valid|=4,e.height=parseInt(a[1],10),e.width=parseInt(a[2],10)),e.valid&2&&e.valid&4)break}return e.valid&2?e.valid&4?e:_(3,"missing image size specifier"):_(3,"missing format specifier")},k=function(r,t,s){const o=t;if(o<8||o>32767||r[0]!==2||r[1]!==2||r[2]&128)return new Uint8Array(r);if(o!==(r[2]<<8|r[3]))return _(3,"wrong scanline width");const i=new Uint8Array(4*t*s);if(!i.length)return _(4,"unable to allocate buffer space");let n=0,e=0;const l=4*o,a=new Uint8Array(4),d=new Uint8Array(l);let u=s;for(;u>0&&e<r.byteLength;){if(e+4>r.byteLength)return _(1);if(a[0]=r[e++],a[1]=r[e++],a[2]=r[e++],a[3]=r[e++],a[0]!=2||a[1]!=2||(a[2]<<8|a[3])!=o)return _(3,"bad rgbe scanline format");let p=0,c;for(;p<l&&e<r.byteLength;){c=r[e++];const E=c>128;if(E&&(c-=128),c===0||p+c>l)return _(3,"bad scanline data");if(E){const R=r[e++];for(let T=0;T<c;T++)d[p++]=R}else d.set(r.subarray(e,e+c),p),p+=c,e+=c}const N=o;for(let E=0;E<N;E++){let R=0;i[n]=d[E+R],R+=o,i[n+1]=d[E+R],R+=o,i[n+2]=d[E+R],R+=o,i[n+3]=d[E+R],n+=4}u--}return i},D=function(r,t,s,o){const i=r[t+3],n=Math.pow(2,i-128)/255;s[o+0]=r[t+0]*n,s[o+1]=r[t+1]*n,s[o+2]=r[t+2]*n,s[o+3]=1},f=function(r,t,s,o){const i=r[t+3],n=Math.pow(2,i-128)/255;s[o+0]=G.toHalfFloat(Math.min(r[t+0]*n,65504)),s[o+1]=G.toHalfFloat(Math.min(r[t+1]*n,65504)),s[o+2]=G.toHalfFloat(Math.min(r[t+2]*n,65504)),s[o+3]=G.toHalfFloat(1)},y=new Uint8Array(g);y.pos=0;const m=U(y);if(m!==-1){const r=m.width,t=m.height,s=k(y.subarray(y.pos),r,t);if(s!==-1){let o,i,n;switch(this.type){case w:n=s.length/4;const e=new Float32Array(n*4);for(let a=0;a<n;a++)D(s,a*4,e,a*4);o=e,i=w;break;case B:n=s.length/4;const l=new Uint16Array(n*4);for(let a=0;a<n;a++)f(s,a*4,l,a*4);o=l,i=B;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:r,height:t,data:o,header:m.string,gamma:m.gamma,exposure:m.exposure,type:i}}}return null}setDataType(g){return this.type=g,this}load(g,b,L,F){function I(h,_){switch(h.type){case w:case B:h.encoding=V,h.minFilter=M,h.magFilter=M,h.generateMipmaps=!1,h.flipY=!0;break}b&&b(h,_)}return super.load(g,I,L,F)}}export{Y as R};