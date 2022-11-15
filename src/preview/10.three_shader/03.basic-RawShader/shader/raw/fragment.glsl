precision lowp float;

// 获取时间
uniform float uTime;
uniform sampler2D uTexture; 
varying vec2 vUv;
varying float z;


void main(){
    
    // gl_FragColor = vec4(cos(uTime), sin(uTime), cos(uTime), 1.0);

    float height = sin((z+uTime)* 10.0)*0.05 +  1.0 ;
    vec4 textureColor = texture2D(uTexture,vUv);

    // float height = modelPosition.z + 0.05 * 20.0;
    textureColor.rgb*= height;
    // textureColor.g = 0.0;
    // textureColor.b = 0.0;
    // textureColor.r
    gl_FragColor = textureColor;
}