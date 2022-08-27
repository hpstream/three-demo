attribute float imgIndex;
attribute float aScale;
uniform float uTime;
varying float vImgIndex;
varying vec2 vUv;
varying vec3 vColor; 
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        // 获取定点的角度
    float angle = atan(modelPosition.x,modelPosition.z);
    // 获取顶点到中心的距离
    float distanceToCenter = length(modelPosition.xz);
    // 根据顶点到中心的距离，设置旋转偏移度数
    float angleOffset = 1.0/distanceToCenter*uTime;
    // 目前旋转的度数
    angle+=angleOffset;

    modelPosition.x = cos(angle)*distanceToCenter;
    modelPosition.z = sin(angle)*distanceToCenter;
    vec4 viewPositon = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPositon;
    // 设置点的大小
    gl_PointSize = 200.0 / -viewPositon.z * aScale;
    vImgIndex = imgIndex;
    vUv = uv;
    vColor = color;
}