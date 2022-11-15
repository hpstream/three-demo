precision lowp float;

// 获取时间
uniform float uTime;
uniform sampler2D uTexture; 
uniform vec2 u_resolution;
varying vec2 v_uv;




void main(){
    float strength = step(0.2,v_uv.x-0.2) ;
    strength *= step(0.2, v_uv.y) ;

    gl_FragColor = vec4(strength,strength,strength,1.0);
}