// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position; \n' +
  'attribute vec4 a_Colour; \n' +
  'varying vec4 v_Colour;\n' +
  'uniform mat4 u_modelMatrix; \n' +
  'void main() {\n' +
  'v_Colour = a_Colour;\n' +
  'gl_PointSize = 5.0;\n' +
  'gl_Position =  u_modelMatrix * a_Position; \n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' + // Precision qualifier
  'varying vec4 v_Colour;\n' +
  'void main() {\n' +
  'gl_FragColor = v_Colour;\n' +
  '}\n';

let canvas, gl;
let modelMatrix;
var verticesColours = [];

let fPos = 0.0;
let sPos = 0.0;
let sSpeed = 0.005;
let sSize = 1.0;
let b1Pos = 0.0;
let b2Pos = 0.0;
let b3Pos = 0.0;

function main() {
  // Retrieve <canvas> element and get the context rendering for WebGL
  canvas = document.getElementById('webgl');
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // attribute variables
  gl.program.a_Colour = gl.getAttribLocation(gl.program, 'a_Colour');
  gl.program.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (gl.program.a_Colour < 0 || gl.program.a_Position < 0) {
	console.log('Failed to get the storage location of attribute variable');
    return -1;
  }


  // uniform variable
  gl.program.u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  if (!gl.program.u_ModelMatrix) {
	console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.05, 1.0);

  var n = initVertexBuffers(gl);

  //Timer
  setInterval(redraw, 50);
  var tick = function() {
	update();
    draw(n);
    requestAnimationFrame(tick);
  }
  tick();

}

function update() {
  // School of fish
  fPos += 0.01;
  if (fPos > 2.0) {
    fPos = -2.0;
  }
  
  // Bubbles
  b1Pos += 0.005;
  if (b1Pos > 2.0) {
    b1Pos = -2.0;
  }
  
    b2Pos += 0.003;
  if (b2Pos > 2.0) {
    b2Pos = -2.0;
  }
  
    b3Pos += 0.008;
  if (b3Pos > 2.0) {
    b3Pos = -2.0;
  }
}

function redraw() {
	sPos += sSpeed; // Purple, red, and cyan fish
	if (sPos > 2.0) {
		sPos = -0.80;
		// Randomize fish speed
        sSpeed = (Math.random() * 0.03) + 0.005;
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesColours), gl.STATIC_DRAW);
	  }
  }

function draw(n) {
	
	// Background
	gl.clear(gl.COLOR_BUFFER_BIT);
    modelMatrix = new Matrix4();
	modelMatrix.setIdentity();
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	
	// Bubbles
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0.0, b1Pos, 0.0);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.POINTS, 4, 1);
	
    modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0.0, b2Pos, 0.0);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.POINTS, 5, 1);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0.0, b3Pos, 0.0);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.POINTS, 6, 1);
	
	// Red fish
    modelMatrix = new Matrix4();
	modelMatrix.setTranslate(sPos, 0.0, 0.0);
	modelMatrix.scale(1.3, 1.3, 1.3);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.TRIANGLES, 7, 9);
	
    // Purple fish
    modelMatrix = new Matrix4();
	modelMatrix.setTranslate(-sPos, 0.0, 0.0);
	modelMatrix.scale(1.2, 1.2, 1.2);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.TRIANGLES, 16, 9);
	
	// Cyan fish
    modelMatrix = new Matrix4();
	modelMatrix.setTranslate(-sPos, 0.0, 0.0);
	modelMatrix.translate(0.0, 0.3, 0.0);
	modelMatrix.scale(1.4, 1.4, 1.4);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.TRIANGLES, 25, 9);
	
	// Plant 1
    modelMatrix = new Matrix4();
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 34, 2);
	gl.drawArrays(gl.TRIANGLE_FAN, 36, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 40, 4);
	gl.drawArrays(gl.TRIANGLES, 44, 9);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(1.5, 0.5, 0.0);
	modelMatrix.scale(1.5, 1.5, 1.5);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 34, 2);
	gl.drawArrays(gl.TRIANGLE_FAN, 36, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 40, 4);
	gl.drawArrays(gl.TRIANGLES, 44, 9);
	
	// Plant 2
	modelMatrix = new Matrix4();
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
    
    modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0.5, -0.5, 0.0);
	modelMatrix.scale(0.5, 0.5, 0.5);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0.3, 0.2, 0.0);
	modelMatrix.scale(1.2, 1.2, 1.2);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(0.2, -0.7, 0.0);
	modelMatrix.scale(0.3, 0.3, 0.3);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(-0.2, -0.7, 0.0);
	modelMatrix.scale(0.3, 0.3, 0.3);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(-0.8, -0.7, 0.0);
	modelMatrix.scale(0.3, 0.3, 0.3);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
	
	modelMatrix = new Matrix4();
	modelMatrix.setTranslate(-0.7, -0.7, 0.0);
	modelMatrix.scale(0.3, 0.3, 0.3);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.LINES, 53, 18);
	
	// School of fish
    modelMatrix = new Matrix4();
	modelMatrix.setTranslate(fPos, 0.0, 0.0);
	modelMatrix.translate(0.0, 0.5, 0.0);
	gl.uniformMatrix4fv(gl.program.u_ModelMatrix, false, modelMatrix.elements);
	gl.drawArrays(gl.TRIANGLES, 71, n-71);

}

function initVertexBuffers(gl) {
  // Vertex coordinates and colour

    verticesColours = [
   -1.0,  1.0,  0.749, 0.749, 1.0, // Background
   -1.0, -1.0,  0.0, 0.0, 0.125,
	1.0,  1.0,  0.749, 0.749, 1.0,
	1.0, -1.0,  0.0, 0.0, 0.125,
	
	0.1, -1.0,  1.0, 1.0, 1.0, // Bubbles
	0.5, -1.0,  1.0, 1.0, 1.0,
	0.3, -1.0,  1.0, 1.0, 1.0,
	
   -0.50, -0.47, 1.0, 0, 0, // Red fish
   -0.50, -0.53, 1.0, 0, 0,
   -0.45, -0.50, 1.0, 0, 0,
   -0.45, -0.50, 1.0, 0, 0,
   -0.35, -0.53, 1.0, 0.6, 0.6,
   -0.35, -0.47, 1.0, 0, 0,
   -0.35, -0.47, 1.0, 0, 0,
   -0.35, -0.53, 1.0, 0.6, 0.6,
   -0.25, -0.50, 1.0, 0, 0,
   
    0.50,  0.47, 0.87, 0.0, 0.87, // Purple fish
    0.50,  0.53, 0.87, 0.0, 0.87,
    0.45,  0.50, 0.87, 0.0, 0.87,
    0.45,  0.50, 0.87, 0.0, 0.87,
    0.35,  0.53, 1.0, 0.8, 1.0,
    0.35,  0.47, 0.87, 0.0, 0.87,
    0.35,  0.47, 0.87, 0.0, 0.87,
    0.35,  0.53, 1.0, 0.8, 1.0,
    0.25,  0.50, 0.87, 0.0, 0.87,
	
	0.62, -0.54, 0.0, 0.5, 0.5, // Cyan fish
    0.62, -0.6, 0.0, 0.5, 0.5,
	0.57, -0.57, 0.0, 0.5, 0.5,
	0.57, -0.57, 0.0, 0.5, 0.5,
	0.47, -0.6, 0.0, 1.0, 1.0,
	0.47, -0.54, 0.0, 0.5, 0.5,
	0.47, -0.54, 0.0, 0.5, 0.5,
	0.47, -0.6, 0.0, 1.0, 1.0,
	0.37, -0.57, 0.0, 0.5, 0.5,
	
	// Plant 1
	-0.6, -1.0, 0.17, 0.33, 0.17, // Stem
	-0.6, -0.4, 0.17, 0.33, 0.17,
	
	-0.6, -0.8, 0.17, 0.33, 0.17, // triangle fan leaves
	-0.7, -0.75, 0.17, 0.33, 0.17,
	-0.8, -0.6, 0.17, 0.33, 0.17,
	-0.65, -0.7, 0.17, 0.33, 0.17,
	
	-0.6, -0.7, 0.17, 0.33, 0.17,
	-0.55, -0.6, 0.17, 0.33, 0.17,
	-0.4, -0.5, 0.17, 0.33, 0.17,
	-0.5, -0.65, 0.17, 0.33, 0.17,
	
	-0.6, -1.0, 0.17, 0.33, 0.17, // triangle leaves.
	-0.7, -0.9, 0.17, 0.33, 0.17,
	-0.7, -0.7, 0.125, 0.21, 0.125,
	-0.6, -0.7, 0.17, 0.33, 0.17,
	-0.65, -0.55, 0.17, 0.33, 0.17,
	-0.6, -0.4, 0.17, 0.33, 0.17,
	-0.6, -0.9, 0.17, 0.33, 0.17,
	-0.4, -0.7, 0.17, 0.33, 0.17,
	-0.5, -0.9, 0.17, 0.33, 0.17,
	
	// Plant 2
	-0.4, -1.0,  0.58, 0.42, 0.42, 
	-0.4, -0.55, 0.58, 0.42, 0.42,
	-0.4, -1.0,  0.58, 0.42, 0.42,
	-0.45, -0.9, 0.58, 0.42, 0.42,
	-0.4, -1.0,  0.58, 0.42, 0.42,
	-0.35, -0.9, 0.58, 0.42, 0.42,
	-0.4, -0.85, 0.58, 0.42, 0.42,
	-0.45, -0.8, 0.58, 0.42, 0.42,
	-0.4, -0.85, 0.58, 0.42, 0.42,
	-0.35, -0.8, 0.58, 0.42, 0.42,
	-0.4, -0.75, 0.58, 0.42, 0.42,
	-0.45, -0.7, 0.58, 0.42, 0.42,
	-0.4, -0.75, 0.58, 0.42, 0.42,
	-0.35, -0.7, 0.58, 0.42, 0.42,
	-0.4, -0.65, 0.58, 0.42, 0.42,
	-0.45, -0.6, 0.58, 0.42, 0.42,
	-0.4, -0.65, 0.58, 0.42, 0.42,
	-0.35, -0.6, 0.58, 0.42, 0.42
	];
  
	
	for (i = 0; i < 12; i++) {
		addFish(); // School of olive fish
	}
	
	console.log(verticesColours);

  // Create a buffer object
  vertexBuffer = gl.createBuffer();
  
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesColours), gl.STATIC_DRAW);
  
  // Define the buffer object connection to the a_Position variable
  gl.vertexAttribPointer(gl.program.a_Position, 2, gl.FLOAT, false, 20, 0);
  gl.vertexAttribPointer(gl.program.a_Colour, 3, gl.FLOAT, false, 20, 8);
  
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(gl.program.a_Position);
  gl.enableVertexAttribArray(gl.program.a_Colour);

  return verticesColours.length / 5;
}

// Add points for school of fish
function addFish() {
	
	var acid = {r: 0.929, g: 0.929, b: 0.0}; 
	var olive = {r: 0.28, g: 0.28, b: 0.0};
	
	var x = (Math.random() * 0.85) + -1.0;
	var y = (Math.random() * 0.85) + -0.85;

	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(acid.r);
	verticesColours.push(acid.g);
	verticesColours.push(acid.b);
	console.log(x + ', ' + y);
	
	y = transform(y, 0.06);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(acid.r);
	verticesColours.push(acid.g);
	verticesColours.push(acid.b);
	console.log(x + ', ' + y);
	
	x = transform(x, -0.05);
	y = transform(y, -0.03);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(acid.r);
	verticesColours.push(acid.g);
	verticesColours.push(acid.b);
	console.log(x + ', ' + y);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(acid.r);
	verticesColours.push(acid.g);
	verticesColours.push(acid.b);
	console.log(x + ', ' + y);

	x = transform(x, -0.10);
	y = transform(y, 0.03);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(olive.r);
	verticesColours.push(olive.g);
	verticesColours.push(olive.b);
	console.log(x + ', ' + y);
	
	y = transform(y, -0.06);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(acid.r);
	verticesColours.push(acid.g);
	verticesColours.push(acid.b);
	console.log(x + ', ' + y);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(acid.r);
	verticesColours.push(acid.g);
	verticesColours.push(acid.b);
	console.log(x + ', ' + y);
	
	y = transform(y, 0.06);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(olive.r);
	verticesColours.push(olive.g);
	verticesColours.push(olive.b);
	console.log(x + ', ' + y);
	
	x = transform(x, -0.10);
	y = transform(y, -0.03);
	
	verticesColours.push(x);
	verticesColours.push(y);
	verticesColours.push(olive.r);
	verticesColours.push(olive.g);
	verticesColours.push(olive.b);
	console.log(x + ', ' + y);
	console.log('FINISH');

}

// Transform x and y values to make perfectly uniform little fishies
function transform(point, num) {
	
	if (point > 0) point += num;
	else point -= num;
	return point;
}