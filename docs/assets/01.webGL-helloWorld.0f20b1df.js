import"./modulepreload-polyfill.b7f2da20.js";let t=document.getElementById("canvas");t.width=window.innerWidth;t.height=window.innerHeight;let e=t.getContext("webgl");e.viewport(0,0,t.width,t.height);let a=e.createShader(e.VERTEX_SHADER);e.shaderSource(a,`
   attribute vec4 a_Position;
   void main(){
      gl_Position = a_Position;
   }
`);e.compileShader(a);let i=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(i,`
 
   void main(){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
   }
`);e.compileShader(i);let r=e.createProgram();e.attachShader(r,a);e.attachShader(r,i);e.linkProgram(r);e.useProgram(r);let n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n);let d=new Float32Array([0,.5,-.5,-.5,.5,-.5]);e.bufferData(e.ARRAY_BUFFER,d,e.STATIC_DRAW);let o=e.getAttribLocation(r,"a_Position");e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(o);e.drawArrays(e.TRIANGLES,0,3);
