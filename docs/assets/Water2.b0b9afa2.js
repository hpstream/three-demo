import{a as j,P as V,g as S,aE as O,V as v,ay as U,aF as D,aG as H,Z as E,aH as z,Q as q,d as Q,h as G,C as X,aI as Z,R as N}from"./three.module.e9e6bd54.js";class F extends j{constructor(b,r={}){super(b),this.isReflector=!0,this.type="Reflector",this.camera=new V;const n=this,_=r.color!==void 0?new S(r.color):new S(8355711),W=r.textureWidth||512,R=r.textureHeight||512,C=r.clipBias||0,M=r.shader||F.ReflectorShader,P=r.multisample!==void 0?r.multisample:4,l=new O,p=new v,u=new v,x=new v,w=new U,y=new v(0,0,-1),f=new D,g=new v,h=new v,e=new D,o=new U,t=this.camera,i=new H(W,R,{samples:P}),c=new E({uniforms:z.clone(M.uniforms),fragmentShader:M.fragmentShader,vertexShader:M.vertexShader});c.uniforms.tDiffuse.value=i.texture,c.uniforms.color.value=_,c.uniforms.textureMatrix.value=o,this.material=c,this.onBeforeRender=function(a,m,s){if(u.setFromMatrixPosition(n.matrixWorld),x.setFromMatrixPosition(s.matrixWorld),w.extractRotation(n.matrixWorld),p.set(0,0,1),p.applyMatrix4(w),g.subVectors(u,x),g.dot(p)>0)return;g.reflect(p).negate(),g.add(u),w.extractRotation(s.matrixWorld),y.set(0,0,-1),y.applyMatrix4(w),y.add(x),h.subVectors(u,y),h.reflect(p).negate(),h.add(u),t.position.copy(g),t.up.set(0,1,0),t.up.applyMatrix4(w),t.up.reflect(p),t.lookAt(h),t.far=s.far,t.updateMatrixWorld(),t.projectionMatrix.copy(s.projectionMatrix),o.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),o.multiply(t.projectionMatrix),o.multiply(t.matrixWorldInverse),o.multiply(n.matrixWorld),l.setFromNormalAndCoplanarPoint(p,u),l.applyMatrix4(t.matrixWorldInverse),f.set(l.normal.x,l.normal.y,l.normal.z,l.constant);const d=t.projectionMatrix;e.x=(Math.sign(f.x)+d.elements[8])/d.elements[0],e.y=(Math.sign(f.y)+d.elements[9])/d.elements[5],e.z=-1,e.w=(1+d.elements[10])/d.elements[14],f.multiplyScalar(2/f.dot(e)),d.elements[2]=f.x,d.elements[6]=f.y,d.elements[10]=f.z+1-C,d.elements[14]=f.w,i.texture.encoding=a.outputEncoding,n.visible=!1;const L=a.getRenderTarget(),I=a.xr.enabled,k=a.shadowMap.autoUpdate;a.xr.enabled=!1,a.shadowMap.autoUpdate=!1,a.setRenderTarget(i),a.state.buffers.depth.setMask(!0),a.autoClear===!1&&a.clear(),a.render(m,t),a.xr.enabled=I,a.shadowMap.autoUpdate=k,a.setRenderTarget(L);const A=s.viewport;A!==void 0&&a.state.viewport(A),n.visible=!0},this.getRenderTarget=function(){return i},this.dispose=function(){i.dispose(),n.material.dispose()}}}F.ReflectorShader={uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <encodings_fragment>

		}`};class T extends j{constructor(b,r={}){super(b),this.isRefractor=!0,this.type="Refractor",this.camera=new V;const n=this,_=r.color!==void 0?new S(r.color):new S(8355711),W=r.textureWidth||512,R=r.textureHeight||512,C=r.clipBias||0,M=r.shader||T.RefractorShader,P=r.multisample!==void 0?r.multisample:4,l=this.camera;l.matrixAutoUpdate=!1,l.userData.refractor=!0;const p=new O,u=new U,x=new H(W,R,{samples:P});this.material=new E({uniforms:z.clone(M.uniforms),vertexShader:M.vertexShader,fragmentShader:M.fragmentShader,transparent:!0}),this.material.uniforms.color.value=_,this.material.uniforms.tDiffuse.value=x.texture,this.material.uniforms.textureMatrix.value=u;const w=function(){const e=new v,o=new v,t=new U,i=new v,c=new v;return function(m){return e.setFromMatrixPosition(n.matrixWorld),o.setFromMatrixPosition(m.matrixWorld),i.subVectors(e,o),t.extractRotation(n.matrixWorld),c.set(0,0,1),c.applyMatrix4(t),i.dot(c)<0}}(),y=function(){const e=new v,o=new v,t=new q,i=new v;return function(){n.matrixWorld.decompose(o,t,i),e.set(0,0,1).applyQuaternion(t).normalize(),e.negate(),p.setFromNormalAndCoplanarPoint(e,o)}}(),f=function(){const e=new O,o=new D,t=new D;return function(c){l.matrixWorld.copy(c.matrixWorld),l.matrixWorldInverse.copy(l.matrixWorld).invert(),l.projectionMatrix.copy(c.projectionMatrix),l.far=c.far,e.copy(p),e.applyMatrix4(l.matrixWorldInverse),o.set(e.normal.x,e.normal.y,e.normal.z,e.constant);const a=l.projectionMatrix;t.x=(Math.sign(o.x)+a.elements[8])/a.elements[0],t.y=(Math.sign(o.y)+a.elements[9])/a.elements[5],t.z=-1,t.w=(1+a.elements[10])/a.elements[14],o.multiplyScalar(2/o.dot(t)),a.elements[2]=o.x,a.elements[6]=o.y,a.elements[10]=o.z+1-C,a.elements[14]=o.w}}();function g(e){u.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),u.multiply(e.projectionMatrix),u.multiply(e.matrixWorldInverse),u.multiply(n.matrixWorld)}function h(e,o,t){n.visible=!1;const i=e.getRenderTarget(),c=e.xr.enabled,a=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(x),e.autoClear===!1&&e.clear(),e.render(o,l),e.xr.enabled=c,e.shadowMap.autoUpdate=a,e.setRenderTarget(i);const m=t.viewport;m!==void 0&&e.state.viewport(m),n.visible=!0}this.onBeforeRender=function(e,o,t){x.texture.encoding=e.outputEncoding,t.userData.refractor!==!0&&(!w(t)||(y(),g(t),f(t),h(e,o,t)))},this.getRenderTarget=function(){return x},this.dispose=function(){x.dispose(),n.material.dispose()}}}T.RefractorShader={uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`

		uniform mat4 textureMatrix;

		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec4 vUv;

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <encodings_fragment>

		}`};class B extends j{constructor(b,r={}){super(b),this.isWater=!0,this.type="Water";const n=this,_=r.color!==void 0?new S(r.color):new S(16777215),W=r.textureWidth||512,R=r.textureHeight||512,C=r.clipBias||0,M=r.flowDirection||new Q(1,0),P=r.flowSpeed||.03,l=r.reflectivity||.02,p=r.scale||1,u=r.shader||B.WaterShader,x=new G,w=r.flowMap||void 0,y=r.normalMap0||x.load("textures/water/Water_1_M_Normal.jpg"),f=r.normalMap1||x.load("textures/water/Water_2_M_Normal.jpg"),g=.15,h=g*.5,e=new U,o=new X;if(F===void 0){console.error("THREE.Water: Required component Reflector not found.");return}if(T===void 0){console.error("THREE.Water: Required component Refractor not found.");return}const t=new F(b,{textureWidth:W,textureHeight:R,clipBias:C}),i=new T(b,{textureWidth:W,textureHeight:R,clipBias:C});t.matrixAutoUpdate=!1,i.matrixAutoUpdate=!1,this.material=new E({uniforms:z.merge([Z.fog,u.uniforms]),vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,transparent:!0,fog:!0}),w!==void 0?(this.material.defines.USE_FLOWMAP="",this.material.uniforms.tFlowMap={type:"t",value:w}):this.material.uniforms.flowDirection={type:"v2",value:M},y.wrapS=y.wrapT=N,f.wrapS=f.wrapT=N,this.material.uniforms.tReflectionMap.value=t.getRenderTarget().texture,this.material.uniforms.tRefractionMap.value=i.getRenderTarget().texture,this.material.uniforms.tNormalMap0.value=y,this.material.uniforms.tNormalMap1.value=f,this.material.uniforms.color.value=_,this.material.uniforms.reflectivity.value=l,this.material.uniforms.textureMatrix.value=e,this.material.uniforms.config.value.x=0,this.material.uniforms.config.value.y=h,this.material.uniforms.config.value.z=h,this.material.uniforms.config.value.w=p;function c(m){e.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),e.multiply(m.projectionMatrix),e.multiply(m.matrixWorldInverse),e.multiply(n.matrixWorld)}function a(){const m=o.getDelta(),s=n.material.uniforms.config;s.value.x+=P*m,s.value.y=s.value.x+h,s.value.x>=g?(s.value.x=0,s.value.y=h):s.value.y>=g&&(s.value.y=s.value.y-g)}this.onBeforeRender=function(m,s,d){c(d),a(),n.visible=!1,t.matrixWorld.copy(n.matrixWorld),i.matrixWorld.copy(n.matrixWorld),t.onBeforeRender(m,s,d),i.onBeforeRender(m,s,d),n.visible=!0}}}B.WaterShader={uniforms:{color:{type:"c",value:null},reflectivity:{type:"f",value:0},tReflectionMap:{type:"t",value:null},tRefractionMap:{type:"t",value:null},tNormalMap0:{type:"t",value:null},tNormalMap1:{type:"t",value:null},textureMatrix:{type:"m4",value:null},config:{type:"v4",value:new D}},vertexShader:`

		#include <common>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>

		uniform mat4 textureMatrix;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			vUv = uv;
			vCoord = textureMatrix * vec4( position, 1.0 );

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vToEye = cameraPosition - worldPosition.xyz;

			vec4 mvPosition =  viewMatrix * worldPosition; // used in fog_vertex
			gl_Position = projectionMatrix * mvPosition;

			#include <logdepthbuf_vertex>
			#include <fog_vertex>

		}`,fragmentShader:`

		#include <common>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>

		uniform sampler2D tReflectionMap;
		uniform sampler2D tRefractionMap;
		uniform sampler2D tNormalMap0;
		uniform sampler2D tNormalMap1;

		#ifdef USE_FLOWMAP
			uniform sampler2D tFlowMap;
		#else
			uniform vec2 flowDirection;
		#endif

		uniform vec3 color;
		uniform float reflectivity;
		uniform vec4 config;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			#include <logdepthbuf_fragment>

			float flowMapOffset0 = config.x;
			float flowMapOffset1 = config.y;
			float halfCycle = config.z;
			float scale = config.w;

			vec3 toEye = normalize( vToEye );

			// determine flow direction
			vec2 flow;
			#ifdef USE_FLOWMAP
				flow = texture2D( tFlowMap, vUv ).rg * 2.0 - 1.0;
			#else
				flow = flowDirection;
			#endif
			flow.x *= - 1.0;

			// sample normal maps (distort uvs with flowdata)
			vec4 normalColor0 = texture2D( tNormalMap0, ( vUv * scale ) + flow * flowMapOffset0 );
			vec4 normalColor1 = texture2D( tNormalMap1, ( vUv * scale ) + flow * flowMapOffset1 );

			// linear interpolate to get the final normal color
			float flowLerp = abs( halfCycle - flowMapOffset0 ) / halfCycle;
			vec4 normalColor = mix( normalColor0, normalColor1, flowLerp );

			// calculate normal vector
			vec3 normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );

			// calculate the fresnel term to blend reflection and refraction maps
			float theta = max( dot( toEye, normal ), 0.0 );
			float reflectance = reflectivity + ( 1.0 - reflectivity ) * pow( ( 1.0 - theta ), 5.0 );

			// calculate final uv coords
			vec3 coord = vCoord.xyz / vCoord.w;
			vec2 uv = coord.xy + coord.z * normal.xz * 0.05;

			vec4 reflectColor = texture2D( tReflectionMap, vec2( 1.0 - uv.x, uv.y ) );
			vec4 refractColor = texture2D( tRefractionMap, uv );

			// multiply water color with the mix of both textures
			gl_FragColor = vec4( color, 1.0 ) * mix( refractColor, reflectColor, reflectance );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>

		}`};export{B as W};
