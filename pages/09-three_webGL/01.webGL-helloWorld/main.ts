let canvas = document.getElementById('canvas') as HTMLCanvasElement

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 获取webGL绘图上下文
let gl = canvas.getContext('webgl');

// 第一次创建webgl绘图上下文，需要设置视口大小
gl.viewport(0, 0, canvas.width, canvas.height);

// 创建顶点着色器
let vertexShader = gl.createShader(gl.VERTEX_SHADER);

// 创建顶点着色器的远吗，需要编写GLSL代码
gl.shaderSource(vertexShader, `
   attribute vec4 a_Position;
   void main(){
      gl_Position = a_Position;
   }
`);

gl.compileShader(vertexShader)

// 创建片元着色器的源码，需要编写GLSL代码
let fragementShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragementShader, `
 
   void main(){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
   }
`);
gl.compileShader(fragementShader);

// 创建程序连接顶点着色器和片元着色器
let program = gl.createProgram();

// 链接顶点着色和片元着色器
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragementShader);
// 链接程序
gl.linkProgram(program);
// use程序进行渲染
gl.useProgram(program);

// 创建顶点缓冲区对象
let vertexBuffer = gl.createBuffer();
// 绑定顶点缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
// 向顶点缓冲区对象中写入数据
let vertices = new Float32Array([
   0.0, 0.5,
   -0.5, -0.5,
   0.5, -0.5
])
//gl.STATIC_DRAW 表示数据不会改变。gl.DYNAMIC_DRAW 表示数据会改变
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// 获得顶点着色器中的a_Positon变量的位置
let a_Position = gl.getAttribLocation(program, 'a_Position');
// 将顶点缓冲区对象分配给a_Position变量
// 告诉openGL如何解析顶点数据
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
// 启用顶点着色器中的a_Position变量
gl.enableVertexAttribArray(a_Position);

// 绘制三角形
gl.drawArrays(gl.TRIANGLES, 0, 3)
export { }









