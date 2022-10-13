import"./modulepreload-polyfill.b7f2da20.js";let r=document.getElementById("canvas");r.width=window.innerWidth;r.height=window.innerHeight;let e=r.getContext("webgl");e.viewport(0,0,r.width,r.height);let i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,`
   attribute vec4 a_Position;
   uniform mat4 u_Mat;
   varying vec4 v_Color;
   void main(){
      gl_Position = u_Mat*a_Position;
      v_Color = gl_Position;
   }
`);e.compileShader(i);let n=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(n,`
   precision mediump float;
   varying vec4 v_Color;
   void main(){
      gl_FragColor = v_Color;
   }
`);e.compileShader(n);let t=e.createProgram();e.attachShader(t,i);e.attachShader(t,n);e.linkProgram(t);e.useProgram(t);let d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d);let h=new Float32Array([0,.5,-.5,-.5,.5,-.5]);e.bufferData(e.ARRAY_BUFFER,h,e.STATIC_DRAW);let l=e.getAttribLocation(t,"a_Position");e.vertexAttribPointer(l,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(l);const a={x:1,y:1,z:1};let o=0;function c(){o+=.01,a.x=Math.sin(o)*1.5,a.y=Math.cos(o)*1.5;const m=new Float32Array([a.x,0,0,0,0,a.x,0,0,0,0,0,0,0,0,0,1]),s=e.getUniformLocation(t,"u_Mat");e.uniformMatrix4fv(s,!1,m),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3),requestAnimationFrame(c)}requestAnimationFrame(c);
