precision lowp float;
attribute vec3 position;
attribute vec2 uv;


uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
varying vec2 vUv;
varying float z;


// 获取时间
uniform float uTime;


void main(){
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    // modelViewMatrix  = viewMatrix * modelMatrix;
  
    modelPosition.z = sin((modelPosition.y+uTime)  * 10.0)*0.05 ;
    modelPosition.z += sin((modelPosition.y+uTime)  * 10.0)*0.05 ;
    // vElevation = modelPosition.z;
    z = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}