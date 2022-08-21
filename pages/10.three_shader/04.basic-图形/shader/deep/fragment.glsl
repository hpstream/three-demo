precision lowp float;

// Vuv的坐标是
varying vec2 vUv;
// 获取时间
uniform float uTime;
// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
void main() {
    // 1通过顶点对应的uv，决定每一个像素在uv图像的位置，通过这个位置x,y决定颜色
    //gl_FragColor =vec4(vUv,0,1) ;

    // 2对第一种变形
    // gl_FragColor = vec4(vUv,1,1);

    // 3.利用uv实现逐渐效果，实现从左到右, [0,1]
    //float strength = vUv.x;
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 4.利用uv实现效果逐渐渐变，从下到上, [1,0]
    // float strength = vUv.y;
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 5.利用uv实现效果逐渐渐变，从上到下, [0,1]
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength,strength,strength,1.0);

    // 6.利用uv实现短范围内的渐变[0,1];
    // float strength = vUv.y * 10.0; // 乘以10区间 [0,10], 大于1的部分仍然为白色；
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 7.利用取模达到反复渐变的效果
    // float strength = mod(vUv.y * 10.0, 1.0); // 乘以10区间 [[0,1],[0,1],....], 大于1的部分仍然为白色；
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 8.使用step(edge,x)如果x<edge,返回0.0，否则返回1.0；
    // float strength = mod(vUv.y*10.0,1.0);
    // strength = step(0.5,strength); // 非黑即白的颜色
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 9.使用step(edge,x)如果x<edge,返回0.0，否则返回1.0；
    // float strength = mod(vUv.y*10.0,1.0);
    // strength = step(0.8,strength); // 非黑即白的颜色
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 10.使用step(edge,x)如果x<edge,返回0.0，否则返回1.0；
    // float strength = mod(vUv.x*10.0,1.0);
    // strength = step(0.8,strength); // 非黑即白的颜色
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 11 条纹相加
    // float strength = step(0.8, mod(vUv.x * 10.0 , 1.0)) ;
    // strength += step(0.8, mod(vUv.y * 10.0 , 1.0)) ;

    // 12条纹相乘
    // float strength = step(0.8, mod(vUv.x * 10.0 , 1.0)) ;
    // strength *= step(0.8, mod(vUv.y * 10.0 , 1.0)) ;

    // 12条纹相减
    // float strength = step(0.8, mod(vUv.x * 10.0 , 1.0)) ;
    // strength -= step(0.8, mod(vUv.y * 10.0 , 1.0)) ;

    // 13方块图形
    // float strength = step(0.2, mod(vUv.x * 10.0 , 1.0)) ;
    // strength *= step(0.2, mod(vUv.y * 10.0 , 1.0)) ;

    // 14 T图形；
    // float barX = step(0.4, mod((vUv.x+uTime*0.1) * 10.0 , 1.0))*step(0.8, mod(vUv.y * 10.0 , 1.0)) ;
    // float barX = step(0.4, mod(vUv.x * 10.0-0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 16 利用绝对值
    // float strength = abs(vUv.x - 0.5) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 17 利用绝对值
    // float strength = min(abs(vUv.x - 0.5),abs(vUv.y - 0.5)) ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 18 取最大值
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))  ;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 19 step
    // float strength =step(0.2,max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 20 小正方形
    // float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 21 利用取整，实现条纹渐变 
    // float strength = floor(vUv.x*10.0)/10.0;
    // gl_FragColor =vec4(strength,strength,strength,1);
    // float strength = floor(vUv.y*10.0)/10.0;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 22条纹相乘，实现渐变格子
    // float strength = floor(vUv.x*10.0)/10.0*floor(vUv.y*10.0)/10.0;
    // gl_FragColor =vec4(strength,strength,strength,1);

    // 23向上取整
    // float strength = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 24随机效果
    float strength = random(vUv);
    gl_FragColor =vec4(strength,strength,strength,1);



}