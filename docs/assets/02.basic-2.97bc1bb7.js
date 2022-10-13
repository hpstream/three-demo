import"./modulepreload-polyfill.b7f2da20.js";import{ar as Q,e as k,aN as U,a as Y,Z as m,aH as M,d as u,aG as C,C as O,g as b,V as S,O as q,M as X,S as $,P as Z,h as J,s as ee,q as te,W as ie,aO as se,a0 as re}from"./three.module.e9e6bd54.js";import{O as ae}from"./OrbitControls.cacaacad.js";import{G as oe}from"./dat.gui.module.6914edc7.js";import{G as ne}from"./GLTFLoader.fddbb79f.js";const P={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class T{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const le=new Q(-1,1,1,-1,0,1),z=new k;z.setAttribute("position",new U([-1,3,0,-1,-1,0,3,-1,0],3));z.setAttribute("uv",new U([0,2,0,0,2,0],2));class E{constructor(e){this._mesh=new Y(z,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,le)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class D extends T{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof m?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=M.clone(e.uniforms),this.material=new m({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new E(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}}class L extends T{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,l;this.inverse?(a=0,l=1):(a=1,l=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(l),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}}class ue extends T{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class he{constructor(e,t){if(this.renderer=e,t===void 0){const s=e.getSize(new u);this._pixelRatio=e.getPixelRatio(),this._width=s.width,this._height=s.height,t=new C(this._width*this._pixelRatio,this._height*this._pixelRatio),t.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],P===void 0&&console.error("THREE.EffectComposer relies on CopyShader"),D===void 0&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new D(P),this.clock=new O}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let r=0,i=this.passes.length;r<i;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),a.needsSwap){if(s){const l=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}L!==void 0&&(a instanceof L?s=!0:a instanceof ue&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new u);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(s,r),this.renderTarget2.setSize(s,r);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}}new Q(-1,1,1,-1,0,1);const j=new k;j.setAttribute("position",new U([-1,3,0,-1,-1,0,3,-1,0],3));j.setAttribute("uv",new U([0,2,0,0,2,0],2));class fe extends T{constructor(e,t,s,r,i){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=r,this.clearAlpha=i!==void 0?i:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new b}render(e,t,s){const r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==void 0&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),i=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,i),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=a),e.autoClear=r}}const A={uniforms:{tDiffuse:{value:null},tSize:{value:new u(256,256)},center:{value:new u(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

		}`};class ce extends T{constructor(e,t,s){super(),A===void 0&&console.error("THREE.DotScreenPass relies on DotScreenShader");const r=A;this.uniforms=M.clone(r.uniforms),e!==void 0&&this.uniforms.center.value.copy(e),t!==void 0&&(this.uniforms.angle.value=t),s!==void 0&&(this.uniforms.scale.value=s),this.material=new m({uniforms:this.uniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.fsQuad=new E(this.material)}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.tSize.value.set(s.width,s.height),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}}const V={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new b(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class w extends T{constructor(e,t,s,r){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=r,this.resolution=e!==void 0?new u(e.x,e.y):new u(256,256),this.clearColor=new b(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new C(i,a),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const R=new C(i,a);R.texture.name="UnrealBloomPass.h"+f,R.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(R);const B=new C(i,a);B.texture.name="UnrealBloomPass.v"+f,B.texture.generateMipmaps=!1,this.renderTargetsVertical.push(B),i=Math.round(i/2),a=Math.round(a/2)}V===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const l=V;this.highPassUniforms=M.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new m({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[f])),this.separableBlurMaterials[f].uniforms.texSize.value=new u(i,a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const K=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=K,this.bloomTintColors=[new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,P===void 0&&console.error("THREE.UnrealBloomPass relies on CopyShader");const y=P;this.copyUniforms=M.clone(y.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new m({uniforms:this.copyUniforms,vertexShader:y.vertexShader,fragmentShader:y.fragmentShader,blending:q,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new b,this.oldClearAlpha=1,this.basic=new X,this.fsQuad=new E(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose()}setSize(e,t){let s=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(s,r);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(s,r),this.renderTargetsVertical[i].setSize(s,r),this.separableBlurMaterials[i].uniforms.texSize.value=new u(s,r),s=Math.round(s/2),r=Math.round(r/2)}render(e,t,s,r,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let l=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[n].uniforms.direction.value=w.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=w.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this.fsQuad.render(e),l=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){return new m({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new u(.5,.5)},direction:{value:new u(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new m({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}w.BlurDirectionX=new u(1,0);w.BlurDirectionY=new u(0,1);const p=new oe,v=new $,d=new Z(75,window.innerHeight/window.innerHeight,1,50);d.position.set(0,0,3);d.aspect=window.innerWidth/window.innerHeight;d.updateProjectionMatrix();v.add(d);const de=new J,me=new ee,W=me.load(["textures/environmentMaps/0/px.jpg","textures/environmentMaps/0/nx.jpg","textures/environmentMaps/0/py.jpg","textures/environmentMaps/0/ny.jpg","textures/environmentMaps/0/pz.jpg","textures/environmentMaps/0/nz.jpg"]);v.background=W;v.environment=W;const F=new te("#ffffff",1);F.castShadow=!0;F.position.set(0,0,200);v.add(F);const ve=new ne;ve.load("./models/DamagedHelmet/glTF/DamagedHelmet.gltf",o=>{console.log(o.scene),v.add(o.scene);const e=o.scene.children[0];v.add(e)});const h=new ie({antialias:!0});h.setSize(window.innerWidth,window.innerHeight);h.toneMapping=se;h.shadowMap.enabled=!0;const c=new he(h);c.setSize(window.innerWidth,window.innerHeight);const pe=new fe(v,d);c.addPass(pe);const N=new ce;N.enabled=!1;c.addPass(N);const g=new w(new u(256,256),1,0,0);c.addPass(g);g.strength=1;g.radius=0;g.threshold=1;h.toneMapping=re;h.toneMappingExposure=1;p.add(h,"toneMappingExposure").min(0).max(2).step(.01);p.add(g,"strength").min(0).max(2).step(.01);p.add(g,"radius").min(0).max(2).step(.01);p.add(g,"threshold").min(0).max(2).step(.01);const x={r:0,g:0,b:0},_=new D({uniforms:{tDiffuse:{value:null},uColor:{value:new b(x.r,x.g,x.b)}},vertexShader:`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform vec3 uColor;
      void main(){
        vec4 color = texture2D(tDiffuse,vUv);
        // gl_FragColor = vec4(vUv,0.0,1.0);
        color.xyz+=uColor;
        gl_FragColor = color;
      }
    `});c.addPass(_);p.add(x,"r").min(-1).max(1).step(.01).onChange(o=>{_.uniforms.uColor.value.r=o});p.add(x,"g").min(-1).max(1).step(.01).onChange(o=>{_.uniforms.uColor.value.g=o});p.add(x,"b").min(-1).max(1).step(.01).onChange(o=>{_.uniforms.uColor.value.b=o});window.addEventListener("resize",()=>{d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),h.setSize(window.innerWidth,window.innerHeight),h.setPixelRatio(window.devicePixelRatio),c.setSize(window.innerWidth,window.innerHeight),c.setPixelRatio(window.devicePixelRatio)});const ge=de.load("./textures/interfaceNormalMap.png"),H=new D({uniforms:{tDiffuse:{value:null},uNormalMap:{value:null},uTime:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }
  `,fragmentShader:`
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform sampler2D uNormalMap;
    uniform float uTime;
    void main(){

      vec2 newUv = vUv;
      newUv += sin(newUv.x*10.0+uTime*0.5)*0.03;

      vec4 color = texture2D(tDiffuse,newUv);
      // gl_FragColor = vec4(vUv,0.0,1.0);
      vec4 normalColor = texture2D(uNormalMap,vUv);
      // \u8BBE\u7F6E\u5149\u7EBF\u7684\u89D2\u5EA6
      vec3 lightDirection = normalize(vec3(-5,5,2)) ;

      float lightness = clamp(dot(normalColor.xyz,lightDirection),0.0,1.0) ;
      color.xyz+=lightness;
      gl_FragColor = color;
    }
  `});H.material.uniforms.uNormalMap.value=ge;c.addPass(H);document.body.appendChild(h.domElement);const I=new ae(d,h.domElement);I.enableDamping=!0;const xe=new O;function G(){I.update();const o=xe.getElapsedTime();H.material.uniforms.uTime.value=o,requestAnimationFrame(G),c.render()}G();
