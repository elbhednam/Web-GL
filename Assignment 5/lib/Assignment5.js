let gl, canvas;
let model;
let vpMatrix, mMatrix, nMatrix, mvpMatrix;
let viewAngleX = 0.0, viewAngleY = 0.0;
let distanceToOrigin = 10.0;
let texLoaded = [];
let refresh = true;

function main() {
  // Retrieve <canvas> element and get rendering context
  canvas = document.getElementById('webgl');
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  //Build all the shader programs
  if(!genShaderPrograms()){
	console.log('TERMINIATING: Failed to build all the shaders');
	return;  
  }
  
  //Locate and attach all the attribute/uniform variables for the shaders
  setAttribUniformLocations();

  //Add the models from library
  addModels();

  //Set the vertex coordinates, the color and the normal
  if(!initVertexBuffers(gl)){
	console.log('TERMINATED: Failed to set the vertex information');
    return;
  }
  
  //start the process of loading textures
  initTextures();
  
  setDrawingDefaults()
  
  // Calculate the view projection matrix, create mvpMatrix/mMatrix/nMatrix
  vpMatrix = new Matrix4();    // Model view projection matrix
  vpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
  vpMatrix.lookAt(2.5, 2.5, 8.75, 0, 0, 0, 0, 1, 0);
  mvpMatrix = new Matrix4();
  mMatrix   = new Matrix4();
  nMatrix   = new Matrix4();
  
  calcVPMatrix();

  var tick = function(){
	if(refresh){
		drawScene();
		refresh = false;
	}
	requestAnimationFrame(tick);
  }
  
  tick();
}

function drawScene(){

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw Torus
  // Pass the model view projection matrix to the variable u_MvpMatrix
  mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
  mMatrix.setIdentity();				//reset model and add transformations
  mMatrix.translate(-2.0, 0.0, 0.0);
  mMatrix.scale(1.5, 1.5, 1.5);
  mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
  nMatrix.setInverseOf(mMatrix);		//create normal matrix
  nMatrix.transpose();

  if(texLoaded[1]){
	gl.useProgram(gl.program3);
	gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
	gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
	gl.uniform1i(gl.program3.u_Sampler, 1);
	gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);  //WHITE
  }
  else {
	gl.useProgram(gl.program1);
    gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
    gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		gl.uniform4f(gl.program1.u_MatColor, 1.0, 1.0, 1.0, 1.0);  //WHITE
  }
  
  drawTorus();
  
  // Draw Sphere
  // Pass the model view projection matrix to the variable u_MvpMatrix
  mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
  mMatrix.setIdentity();				//reset model and add transformations
  mMatrix.translate(1.0, -1.0, -2.0);
  mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
  nMatrix.setInverseOf(mMatrix);		//create normal matrix
  nMatrix.transpose();

  if(texLoaded[2]){
	gl.useProgram(gl.program3);
	gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
	gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
	gl.uniform1i(gl.program3.u_Sampler, 2);
	gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);  // White
  }
  else{
  gl.useProgram(gl.program2);
  gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
  gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
  gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
  gl.uniform4f(gl.program2.u_MatColor, 1.0, 0.0, 0.0, 1.0);  // White

  }
  drawSphere(1);

  // Draw textured cube
  gl.useProgram(gl.program2);
  mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
  mMatrix.setIdentity();				//reset model and add transformations
  mMatrix.translate(-0.5, 0.0, -1.8);
  mMatrix.scale(0.5, 0.5, 0.5);
  mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
  nMatrix.setInverseOf(mMatrix);		//create normal matrix
  nMatrix.transpose();

  if(texLoaded[0]){
	gl.useProgram(gl.program3);
	gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
	gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
	gl.uniform1i(gl.program3.u_Sampler, 0);
	gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);  // White
  }
  
  else{
    gl.useProgram(gl.program2);
    gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
    gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	gl.uniform4f(gl.program2.u_MatColor, 1.0, 1.0, 1.0, 1.0);  // White

  }

  drawCube(2);
  
// Draw Tetrahedron
	gl.useProgram(gl.program1);
	mvpMatrix.set(vpMatrix);
	mMatrix.setIdentity();
	mMatrix.translate(1.8, 1.0, 1.0);
	mvpMatrix.multiply(mMatrix);
 
  if(texLoaded[3]){
	gl.useProgram(gl.program3);
	gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
	gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
	gl.uniform1i(gl.program3.u_Sampler, 3);
	gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);  // White
  }
  
  else{
    gl.useProgram(gl.program1);
    gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
    gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);

  }

	drawTetrahedron();

}

function calcVPMatrix(){
  var eye = new Vector4([0, 0, distanceToOrigin, 1]);
  
  vpMatrix.setRotate(viewAngleY, 0, 1, 0);
  vpMatrix.rotate(viewAngleX, 1, 0, 0);
  eye = vpMatrix.multiplyVector4(eye);
  
  var aspect = canvas.width/canvas.height;
  vpMatrix.setPerspective(30, aspect, 1, 100);

  vpMatrix.lookAt(eye.elements[0],eye.elements[1],eye.elements[2], 0,0,0,0,1,0);
}

function zoomIn() {
	distanceToOrigin -= (distanceToOrigin > 2? 0.5: 0);
	console.log("Distance to Origin: " + distanceToOrigin);
	calcVPMatrix();
	refresh = true;
}

function zoomOut() {
	distanceToOrigin += (distanceToOrigin < 20 ? 0.5: 0);
	console.log("Distance to Origin: " + distanceToOrigin);
	calcVPMatrix();
	refresh = true;
}

function up(){
	viewAngleX -= (viewAngleX > -90 ? 5: 0);
	console.log("viewAngleX: " + viewAngleX);
	calcVPMatrix();
	refresh = true;
}

function down(){
	viewAngleX += (viewAngleX < 90 ? 5: 0);
	console.log("viewAngleX: " + viewAngleX);
	calcVPMatrix();
	refresh = true;
}

function left(){
	viewAngleY -= 5;
	viewAngleY %=360;
	console.log("viewAngleY: " + viewAngleY);
	calcVPMatrix();
	refresh = true;
}

function right(){
	viewAngleY += 5;
	viewAngleY %=360;
	console.log("viewAngleY: " + viewAngleY);
	calcVPMatrix();
	refresh = true;
}

function reset(){
	viewAngleX = -15.0;
	viewAngleY =  15.0;
	distanceToOrigin = 10.0;
	console.log("Reset  - projection mode unchanged");
	calcVPMatrix();
	refresh = true;
}
  /****************************************************************************************************/
//ADD MODELS TO COMMON MODEL AND PROVIDE CUSTOM DRAW MODEL FUNCTIONS
/****************************************************************************************************/

function addModels(){
	//Note: for each model, an appropriate draw function should be included
	model = modelCollection_EmptyModel();
	modelCollection_AddModel(model, modelCollection_Tetrahedron); //base = 0, numVertsToDraw = 12
	modelCollection_AddModel(model, modelCollection_Torus); //base = 12, numVertsToDraw = 3072
    modelCollection_AddModel(model, modelCollection_Sphere); //base = 3084, numVertsToDraw = 5400
    modelCollection_AddModel(model, modelCollection_Cube);	//base = 8484, numVertsToDraw = 36

}

function drawTetrahedron(){
	var base = 0;
	gl.drawArrays(gl.TRIANGLES, base, 12);	
	
}

function drawTorus() {
	var base = 12;
	gl.drawElements(gl.TRIANGLES, 3072, gl.UNSIGNED_SHORT, base * 2);		  // Draw Torus
}

function drawSphere(version){
	var base = 3084;  //offset to cube indices
	//don't care about version
	gl.drawElements(gl.TRIANGLES, 5400, gl.UNSIGNED_SHORT, base * 2);		  // Draw the entire sphere
}

function drawCube(version){
	var base = 8484;  //offset to cube indices
	if(!version) version = 1;
	if(version == 1){
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, base * 2);		  // Draw the entire cube
	}
	else if(version == 2){
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (base +  0) * 2);   // Draw front  of the cube
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (base +  6) * 2);   // Draw right  of the cube
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (base + 12) * 2);   // Draw top    of the cube
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (base + 18) * 2);   // Draw left   of the cube
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (base + 24) * 2);   // Draw bottom of the cube
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (base + 30) * 2);   // Draw back   of the cube
	}
}


/****************************************************************************************************/



/****************************************************************************************************/
//INITIALIZE VBO'S and ATTACH ATTRIBUTES
/****************************************************************************************************/
function initVertexBuffers(gl) {

  // Indices of the vertices
  var indices = new Uint16Array(model.indices);

  gl.useProgram(gl.program1);
  // Program 1: Write the vertex property to buffers (coordinates, colors and normals)
  if (!(gl.program1.vboVertices = util_InitArrayBuffer(gl, gl.program1.a_Position, model.vertices, 3))) return -1;
  if (!(gl.program1.vboColors   = util_InitArrayBuffer(gl, gl.program1.a_Color,    model.colors,   3))) return -1;
  if (!(gl.program1.vboNormals  = util_InitArrayBuffer(gl, gl.program1.a_Normal,   model.normals,  3))) return -1;

  gl.useProgram(gl.program3);
  // Program 2: connect second program attributes to existing VBOS
  gl.program2.vboVertices = util_AttachAttribToVBO(gl, gl.program2.a_Position, gl.program1.vboVertices, 3);
  gl.program2.vboVertices = util_AttachAttribToVBO(gl, gl.program2.a_Normal, gl.program1.vboNormals, 3);

  gl.useProgram(gl.program3);
  // Program 3: connect third program attributes to existing VBO's plus Texels
  gl.program3.vboVertices      = util_AttachAttribToVBO(gl, gl.program2.a_Position, gl.program1.vboVertices, 3);
  gl.program3.vboVertices      = util_AttachAttribToVBO(gl, gl.program2.a_Normal, gl.program1.vboNormals, 3);
  if (!(gl.program3.vboTexels  = util_InitArrayBuffer(gl, gl.program3.a_TexCoord, model.texels,   2))){
	console.log("issue with texel loading");
	return -1;
  }

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}


/****************************************************************************************************/
//INITIALIZE TEXTURES
/****************************************************************************************************/

function initTextures() {

	//Texture 1 - do for each texture
    texLoaded[0] = false;
	var textureObject0 = gl.createTexture();			//create texture object

	var image0 = new Image();						//create image object
	image0.onload 									//register handler for when loaded
			= function() { loadTexture(textureObject0, image0, gl.TEXTURE0, 0); };
	image0.src = 'Resources/rubiks.jpg';				//set the image source to start load

	//Texture 1 - do for each texture
    texLoaded[1] = false;
	var textureObject1 = gl.createTexture();			//create texture object

	var image1 = new Image();						//create image object
	image1.onload 									//register handler for when loaded
			= function() { loadTexture(textureObject1, image1, gl.TEXTURE1, 1); };
	image1.src = 'Resources/sprinkles.jpg';				//set the image source to start load
	
	// Texture 3
    texLoaded[2] = false;
    var image3 = new Image();
    image3.onload = function() {
    loadTexture(gl.createTexture(), image3, gl.TEXTURE2, 2);
  };
    image3.src = 'Resources/swirls.png';
	
	// Texture 
    texLoaded[3] = false;
    var image4 = new Image();
    image4.onload = function() {
    loadTexture(gl.createTexture(), image4, gl.TEXTURE3, 3);
  };
    image4.src = 'Resources/brick.jpg';


  return;
}

function loadTexture(texObj, image, texUnit, num) {

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);				//Flip the image's y axis

	gl.activeTexture(texUnit);								//select texture unit

	gl.bindTexture(gl.TEXTURE_2D, texObj);  				//bind object to target

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//indicate texture is loaded
	texLoaded[num] = true;

	drawScene();
}

/****************************************************************************************************/
//ATTRIBUTE AND UNIFORM LOCATIONS FOR SHADERS, DEFAULT VALUES
/****************************************************************************************************/

function setAttribUniformLocations(){

	//////  PROGRAM 1   //////
	gl.useProgram(gl.program1)
	// Get the storage locations of the attribute variables
	gl.program1.a_Position   = util_AddAttribute(gl, gl.program1, 'a_Position');
	gl.program1.a_Color      = util_AddAttribute(gl, gl.program1, 'a_Color');
	gl.program1.a_Normal     = util_AddAttribute(gl, gl.program1, 'a_Normal');

	// Get the storage locations of uniform variables and so on
	gl.program1.u_MvpMatrix     = util_AddUniform(gl, gl.program1, 'u_MvpMatrix');
	gl.program1.u_NormalMatrix  = util_AddUniform(gl, gl.program1, 'u_NormalMatrix');
	gl.program2.u_ModelMatrix   = util_AddUniform(gl, gl.program1, 'u_ModelMatrix');
	gl.program1.u_LightColor    = util_AddUniform(gl, gl.program1, 'u_LightColor');
	gl.program1.u_LightPosition = util_AddUniform(gl, gl.program1, 'u_LightPosition');
	gl.program1.u_AmbientLight  = util_AddUniform(gl, gl.program1, 'u_AmbientLight');

	//////  PROGRAM 2   //////
	gl.useProgram(gl.program2)
	// Get the storage locations of the attribute variables
	gl.program2.a_Position   = util_AddAttribute(gl, gl.program2, 'a_Position');
	gl.program2.a_Normal     = util_AddAttribute(gl, gl.program2, 'a_Normal');

	// Get the storage locations of uniform variables and so on
	gl.program2.u_MvpMatrix     = util_AddUniform(gl, gl.program2, 'u_MvpMatrix');
	gl.program2.u_NormalMatrix  = util_AddUniform(gl, gl.program2, 'u_NormalMatrix');
	gl.program2.u_ModelMatrix   = util_AddUniform(gl, gl.program2, 'u_ModelMatrix');
	gl.program2.u_MatColor      = util_AddUniform(gl, gl.program2, 'u_MatColor');
	gl.program2.u_LightColor    = util_AddUniform(gl, gl.program2, 'u_LightColor');
	gl.program2.u_LightPosition = util_AddUniform(gl, gl.program2, 'u_LightPosition');
	gl.program2.u_AmbientLight  = util_AddUniform(gl, gl.program2, 'u_AmbientLight');


	//////  PROGRAM 3   //////
	gl.useProgram(gl.program3)
	// Get the storage locations of the attribute variables
	gl.program3.a_Position   = util_AddAttribute(gl, gl.program3, 'a_Position');
	gl.program3.a_Normal     = util_AddAttribute(gl, gl.program3, 'a_Normal');
	gl.program3.a_TexCoord   = util_AddAttribute(gl, gl.program3, 'a_TexCoord');

	// Get the storage locations of uniform variables and so on
	gl.program3.u_MvpMatrix      = util_AddUniform(gl, gl.program3, 'u_MvpMatrix');
	gl.program3.u_NormalMatrix   = util_AddUniform(gl, gl.program3, 'u_NormalMatrix');
	gl.program3.u_MatColor       = util_AddUniform(gl, gl.program3, 'u_MatColor');
	gl.program3.u_LightColor     = util_AddUniform(gl, gl.program3, 'u_LightColor');
	gl.program3.u_LightDirection = util_AddUniform(gl, gl.program3, 'u_LightDirection');
	gl.program3.u_AmbientLight   = util_AddUniform(gl, gl.program3, 'u_AmbientLight');
	gl.program3.u_Sampler        = util_AddUniform(gl, gl.program3, 'u_Sampler');

}


function setDrawingDefaults() {

	// Set the clear color, enable the depth test, set default material color
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	var lightPosition = new Vector3([500.0, 800.0, 700.0]);  //also used as direction
	lightPosition.normalize();     // Normalize

	//Program 1 specific defaults / initial settings
	gl.useProgram(gl.program1);
	gl.uniform3f(gl.program1.u_LightColor, 1.0, 1.0, 1.0);
	gl.uniform3fv(gl.program1.u_LightPosition, lightPosition.elements);
	gl.uniform3f(gl.program1.u_AmbientLight, 0.2, 0.2, 0.2);

	//Program 2 specific defaults / initial settings
	gl.useProgram(gl.program2);
	gl.uniform4f(gl.program2.u_MatColor, 1.0, 0.0, 0.0, 1.0);  //RED
	gl.uniform3f(gl.program2.u_LightColor, 1.0, 1.0, 1.0);
	gl.uniform3fv(gl.program2.u_LightPosition, lightPosition.elements);
	gl.uniform3f(gl.program2.u_AmbientLight, 0.2, 0.2, 0.2);

	//Program 3 specific defaults / initial settings
	gl.useProgram(gl.program3);
	gl.uniform3f(gl.program3.u_LightColor, 1.0, 1.0, 1.0);
	gl.uniform3fv(gl.program3.u_LightDirection, lightPosition.elements);
	gl.uniform3f(gl.program3.u_AmbientLight, 0.2, 0.2, 0.2);

	return;
}

/****************************************************************************************************/
//GENERATE ALL THE SHADER PROGRAMS
/****************************************************************************************************/
function genShaderPrograms(){

	if(!(gl.program1 = util_InitShaders(gl, VSHADER_SOURCE1, FSHADER_SOURCE1))) {
		console.log("Error building program 1");
		return false;
	}

	if(!(gl.program2 = util_InitShaders(gl, VSHADER_SOURCE2, FSHADER_SOURCE2))) {
		console.log("Error building program 2");
		return false;
	}

	if(!(gl.program3 = util_InitShaders(gl, VSHADER_SOURCE3, FSHADER_SOURCE3))) {
		console.log("Error building program 3");
		return false;
	}

	return true;
}


/****************************************************************************************************/
//SHADER DEFINITIONS
/****************************************************************************************************/
//SET 1:  Uses per vertice colours, Gourand-Phong shading, point lighting

var VSHADER_SOURCE1 =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec4 a_Color;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform vec3 u_AmbientLight;\n' +

  'varying vec4 v_Color;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position ;\n' +
  '  vec4 color = a_Color;\n' +
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  '  vec3 LightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
//  '  vec3 normal = normalize(a_Normal.xyz);\n' +
  '  float nDotL = max(dot(LightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * color.rgb * nDotL ;\n' +
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +

  '  v_Color = vec4((diffuse+ambient), color.a);\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE1 =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying   vec4 v_Color;\n' +
  'void main() {\n' +
 '  gl_FragColor = v_Color;\n' +
  '}\n';


//SET 2:  Uses material colour for shading, Phong-Phong shading, point lighting
var VSHADER_SOURCE2 =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform vec3 u_LightPosition;\n' +

  'varying vec4 v_Normal;\n' +
  'varying vec3 v_LightDirection;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position ;\n' +
  '  v_Normal = vec4(normalize(vec3(u_NormalMatrix * a_Normal)), 1.0);\n' +
//  '  v_Normal = a_Normal;\n' +
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  '  v_LightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
  '}\n';


var FSHADER_SOURCE2 =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +

  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec4 u_MatColor;\n' +

  'varying vec4 v_Normal;\n' +
  'varying vec3 v_LightDirection;\n' +

  'void main() {\n' +
  '  vec4 color = u_MatColor;\n' +
  '  vec3 normal = normalize(v_Normal.xyz);\n' +
  '  float nDotL = max(dot(v_LightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * color.rgb * nDotL ;\n' +
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +

  '  gl_FragColor = vec4((diffuse+ambient), color.a);\n' +
  '}\n';


//SET 3:  Uses material colour for shading plus texture, Gourand-Phong shading, directional lighting
var VSHADER_SOURCE3 =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightDirection;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec4 u_MatColor;\n' +   		//typically white

  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position ;\n' +
  '  vec4 color = u_MatColor;\n' +
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * color.rgb * nDotL ;\n' +
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +

  '  v_Color = vec4((diffuse+ambient), color.a);\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

var FSHADER_SOURCE3 =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +

  'void main() {\n' +
  '  vec4 texelColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '  gl_FragColor = texelColor * v_Color;\n' +
  '}\n';
