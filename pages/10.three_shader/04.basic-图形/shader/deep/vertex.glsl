precision lowp float;

varying vec2 vUv;

// 获取时间
uniform float uTime;


void main(){
    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );;
}