function modelCollection_EmptyModel() {
	var emptyModel = {vertices: [], colors: [], normals: [], texels: [], indices: [], verticeCount: 0};
	return emptyModel;
}

function modelCollection_AddModel(baseModel, addModel){
	if(baseModel.verticeCount<0){
		console.log('ERROR: baseModel provided to modelCollection_AddModel is invalid.');
		return -1;
	}

	if(!addModel){
		console.log('ERROR: the model specificed to be added in modelCollection_AddModel is unknown.');
		return -1;
	}
	
	var vertCount = baseModel.verticeCount;

	var vertsToAdd = addModel.definedVertices;
	for(var i = 0; i < vertsToAdd; i++){
		baseModel.vertices.push(addModel.vertices[i * 3 + 0]);	//add vertex
		baseModel.vertices.push(addModel.vertices[i * 3 + 1]);	
		baseModel.vertices.push(addModel.vertices[i * 3 + 2]);	

		baseModel.colors.push(addModel.colors[i * 3 + 0]);		//add color
		baseModel.colors.push(addModel.colors[i * 3 + 1]);	
		baseModel.colors.push(addModel.colors[i * 3 + 2]);	

		baseModel.normals.push(addModel.normals[i * 3 + 0]);		//add normal
		baseModel.normals.push(addModel.normals[i * 3 + 1]);	
		baseModel.normals.push(addModel.normals[i * 3 + 2]);	

		baseModel.texels.push(addModel.texels[i * 2 + 0]);		//add texel
		baseModel.texels.push(addModel.texels[i * 2 + 1]);	
		
	}
	for(var i = 0; i < addModel.indexCount; i++){
		baseModel.indices.push(addModel.indices[i] + vertCount);
	}
	
	baseModel.verticeCount = vertCount + vertsToAdd;

}

//******************************************************************************************************************************
//BASIC STRUCTURES

function modelCollection_AddLine(baseModel, x1, y1, z1, x2, y2, z2){
	if(baseModel.verticeCount<0){
		console.log('ERROR: baseModel provided to modelCollection_AddLine is invalid.');
		return -1;
	}
	var vertCount = baseModel.verticeCount;
	baseModel.vertices.push(x1);	//add vertex1
	baseModel.vertices.push(y1);	
	baseModel.vertices.push(z1);	
	baseModel.vertices.push(x2);	//add vertex2
	baseModel.vertices.push(y2);	
	baseModel.vertices.push(z2);	

	baseModel.colors.push(1.0);		//add color
	baseModel.colors.push(1.0);	
	baseModel.colors.push(1.0);	
	baseModel.colors.push(1.0);		//add color
	baseModel.colors.push(1.0);	
	baseModel.colors.push(1.0);	

	baseModel.normals.push(0.0);	//add normal
	baseModel.normals.push(0.0);	
	baseModel.normals.push(0.0);	
	baseModel.normals.push(0.0);	//add normal
	baseModel.normals.push(0.0);	
	baseModel.normals.push(0.0);	

	baseModel.texels.push(0.0);		//add texel
	baseModel.texels.push(0.0);	
	baseModel.texels.push(1.0);		//add texel
	baseModel.texels.push(1.0);	

	baseModel.indices.push(vertCount);
	baseModel.indices.push(vertCount+1);

	baseModel.verticeCount = vertCount + 2;
}

const modelCollection_Cube = {

    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
	definedVertices: 24,
	indexCount: 36,

    vertices: [   // Coordinates
     1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // v0-v1-v2-v3 front
     1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0, // v0-v3-v4-v5 right
     1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0, // v0-v5-v6-v1 top
    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0, // v1-v6-v7-v2 left
    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // v7-v4-v3-v2 bottom
     1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0  // v4-v7-v6-v5 back
    ],

    colors: [    // Colors
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front  - RED
    0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0,     // v0-v3-v4-v5 right  - GREEN
    0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1,     // v0-v5-v6-v1 top    - BLUE
    1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0,     // v1-v6-v7-v2 left   - YELLOW
    1, 0, 1,   1, 0, 1,   1, 0, 1,  1, 0, 1,     // v7-v4-v3-v2 bottom - PURPLE
    0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1　     // v4-v7-v6-v5 back   - CYAN
    ],

    normals: [    // Normal
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 top
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 bottom
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
    ],

    texels: [    // Texel
    1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,  // v0-v1-v2-v3 front
    0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,  // v0-v3-v4-v5 right
    1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,  // v0-v5-v6-v1 top
    1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,  // v1-v6-v7-v2 left
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,  // v7-v4-v3-v2 bottom
    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0   // v4-v7-v6-v5 back
    ],

    // Indices of the vertices
    indices: [
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // top
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // bottom
    20,21,22,  20,22,23     // back
    ]
}


//**********************************************************************************************************
const modelCollection_Tetrahedron = {

  // Create a tetrahedron
  //         v3
  //        / |\
  //       /  | \
  //      /   |  \ 
  //     v2------v1
  //       \  | /
  //         v4

  //USE:  when using all the vertices
  // gl.drawArrays(GL.TRIANGLES, x, 12);  where x is offset (in vertices) to starting vertex 
  // also, each triangles is a side {Back, Right, Bottom, Left}  
  // not yet ready for drawElements
	definedVertices: 12,
	indexCount: 12,

    vertices: [
		 1.0,  0.0, -0.7071,	-1.0,  0.0, -0.7071,	 0.0,  1.0,  0.7071,  //v1-v2-v3  BACK
		 0.0, -1.0,  0.7071,	 1.0,  0.0, -0.7071,	 0.0,  1.0,  0.7071,  //v4-v1-v3  RIGHT
		 1.0,  0.0, -0.7071,	 0.0, -1.0,  0.7071,	-1.0,  0.0, -0.7071,  //v1-v4-v2  BOTTOM
		 0.0,  1.0,  0.7071,	-1.0,  0.0, -0.7071,	 0.0, -1.0,  0.7071   //v3-v2-v4  LEFT
	],
	
	colors: [
		 1.0, 0.0, 0.0,		1.0, 0.0, 0.0,		1.0, 0.0, 0.0,	//BACK   - red
		 0.0, 1.0, 0.0,		0.0, 1.0, 0.0,		0.0, 1.0, 0.0,	//RIGHT  - green
		 0.0, 0.0, 1.0,		0.0, 0.0, 1.0,		0.0, 0.0, 1.0,	//BOTTOM - blue
		 0.6, 0.0, 0.6,		0.6, 0.0, 0.6,		0.6, 0.0, 0.6	//LEFT   - purple
	],
    
	normals: [
		 0.0,    -0.8165, 0.5774,	 0.0,    -0.8165, 0.5774,	 0.0,    -0.8165, 0.5774,   //v1-v2-v3  BACK
		 0.8165,  0.0,    0.5774,    0.8165,  0.0,    0.5774,    0.8165,  0.0,    0.5774, 	//v4-v1-v2  RIGHT
		 0.0,     0.8165, 0.5774,    0.0,     0.8165, 0.5774,    0.0,     0.8165, 0.5774,   //v1-v4-v3  BOTTOM
		-0.8165,  0.0,    0.5774,   -0.8165,  0.0,    0.5774,   -0.8165,  0.0,    0.5774    //v2-v3-v4  LEFT
    ],
	
	texels: [
		 0.0,  0.0,		1.0,  0.0,		0.5,  1.0,  //v1-v2-v3
		 0.0,  0.0,		1.0,  0.0,		0.5,  1.0,  //v4-v1-v3
		 1.0,  0.0,		0.5,  1.0,		0.0,  0.0,  //v1-v4-v2
		 0.5,  1.0,		0.0,  0.0,		1.0,  0.0   //v3-v2-v4
	],

	indices: [
	   1,  2,  3, 	//BACK
	   4,  5,  6,	//RIGHT		
	   7,  8,  9,	//BOTTOM
	  10, 11, 12	//LEFT
	]
};	

	
//**********************************************************************************************************

const modelCollection_Sphere = genSphere(30);

function genSphere(n){
	
	var model = {definedVertices: 0, indexCount: 0,  vertices: [], colors: [], normals: [], texels: [], indices: [], ready: false};

	if(!n || n <=0 ) return model;
	
	var SPHERE_DIV = n;

	var i, ai, si, ci;
	var j, aj, sj, cj;
	var p1, p2;
	var texS, texT;
    
	// Generate coordinates
	for (j = 0; j <= SPHERE_DIV; j++) {     //j represents moving from top to bottom
		texT = Math.round((1 - j / SPHERE_DIV) * 100) / 100;  
		aj = j * Math.PI / SPHERE_DIV;
		sj = Math.sin(aj);
		cj = Math.cos(aj);
		for (i = 0; i <= SPHERE_DIV; i++) {  //i represents the horizontal circles
			texS = Math.round(i / SPHERE_DIV * 100) / 100;
			ai = i * 2 * Math.PI / SPHERE_DIV;
			si = Math.sin(ai);
			ci = Math.cos(ai);

			var x = si * sj;
			var y = cj;
			var z = ci * sj;
			model.vertices.push(x);  // X
			model.vertices.push(y);  // Y
			model.vertices.push(z);  // Z
			  
			model.normals.push(x);  // X
			model.normals.push(y);  // Y
			model.normals.push(z);  // Z
			  
			model.colors.push(x);  // R
			model.colors.push(y);  // G
			model.colors.push(z);  // B

			model.texels.push(texS);		// S for texture
			model.texels.push(texT);		// T for texture
			  
		}
	}

	// Generate indices
	for (j = 0; j < SPHERE_DIV; j++) {
		for (i = 0; i < SPHERE_DIV; i++) {
			p1 = j * (SPHERE_DIV+1) + i;
			p2 = p1 + (SPHERE_DIV+1);

			model.indices.push(p1);
			model.indices.push(p2);
			model.indices.push(p1 + 1);
			model.indices.push(p1 + 1);
			model.indices.push(p2);
			model.indices.push(p2 + 1);
		}
	}
	
	model.definedVertices = model.vertices.length;
	model.indexCount = model.indices.length;
	console.log(model.indexCount);
	model.ready = true;
	
	return model;
}

const modelCollection_Torus = genTorus();

function genTorus() {
	
   var model = {definedVertices: 0, indexCount: 0,  vertices: [], colors: [], normals: [], texels: [], indices: [], ready: false};
   
   outerRadius = 0.5; // Distance from the center to the outside of the tube
   innerRadius = outerRadius/3; // Distance from the center to the inside of the tube
   slices = 32; // Number of lines parallel to the z-axis that go around the tube through the hole
   stacks = 16; // Number of lines perpendicular to the z-axis that go around the tube around the hole
   var vertexCount = (slices + 1) * (stacks + 1);
   var du = 2 * Math.PI / slices;
   var dv = 2 * Math.PI / stacks;
   var centerRadius = (innerRadius+outerRadius) / 2;
   var tubeRadius = outerRadius - centerRadius;
   var i,j,u,v,cx,cy,sin,cos,x,y,z;
   var p1, p2;
   var texS, texT;

   for (j = 0; j <= stacks; j++) {
      v = -Math.PI + j * dv;
      cos = Math.cos(v);
      sin = Math.sin(v);
      for (i = 0; i <= slices; i++) {
         u = i * du;
         cx = Math.cos(u);
         cy = Math.sin(u);
         x = cx * (centerRadius + tubeRadius * cos);
         y = cy * (centerRadius + tubeRadius * cos);
         z = sin * tubeRadius;
		 texS = i / slices;
		 texT = j / stacks;
		 
         model.vertices.push(x);
         model.vertices.push(y);
		 model.vertices.push(z);
		 
		 model.normals.push(cx * cos);
         model.normals.push(cy * cos);
         model.normals.push(sin);
		 
		 model.colors.push(x);  // R
	     model.colors.push(y);  // G
	     model.colors.push(z);  // B
		 
         model.texels.push(texS); // S for texture
         model.texels.push(texT); // T for texture
      } 
   }

   for (j = 0; j < stacks; j++) {
      p1 = j * (slices + 1);
      p2 = (j + 1) * (slices + 1);
	  
      for (i = 0; i < slices; i++) {
          model.indices.push(p1 + i);
          model.indices.push(p2 + i + 1);
          model.indices.push(p2 + i);
          model.indices.push(p1 + i);
          model.indices.push(p1 + i + 1);
          model.indices.push(p2 + i + 1);
      }
   }
   
   model.definedVertices = model.vertices.length;
   model.indexCount = model.indices.length;
   console.log(model.indexCount);
   model.ready = true;
   return model;
}

// Borrowed from Brian's Model Collection - Thanks Brian!
const modelCollection_Cone = genCone(24);
function genCone(n) {
	
var model = {definedVertices: 0, indexCount: 0,  vertices: [], colors: [], normals: [], texels: [], indices: [], ready: false};

  if (!n || n <= 0) return model;

  var CONE_DIV = n;

  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;
  var texS, texT;

  // Generate coordinates
  for (j = 0; j <= CONE_DIV; j++) { //j represents moving from top to bottom
    texT = Math.round((1 - j / CONE_DIV) * 100) / 100;
    aj = j * Math.PI / CONE_DIV;

    // Make a cone instead of sphere
    sj = j / (CONE_DIV / 2);
    cj = j / (CONE_DIV / 2);

    for (i = 0; i <= CONE_DIV; i++) { //i represents the horizontal circles
      texS = Math.round(i / CONE_DIV * 100) / 100;
      ai = i * 2 * Math.PI / CONE_DIV;
      si = Math.sin(ai);
      ci = Math.cos(ai);

      var x = si * sj;
      var y = cj;
      var z = ci * sj;
      model.vertices.push(x); // X
      model.vertices.push(y); // Y
      model.vertices.push(z); // Z

      model.normals.push(x); // X
      model.normals.push(y); // Y
      model.normals.push(z); // Z

      model.colors.push(x); // X
      model.colors.push(y); // Y
      model.colors.push(z); // Z

      model.texels.push(texS); // S for texture
      model.texels.push(texT); // T for texture

    }
  }

  // Generate indices
  for (j = 0; j < CONE_DIV; j++) {
    for (i = 0; i < CONE_DIV; i++) {
      p1 = j * (CONE_DIV + 1) + i;
      p2 = p1 + (CONE_DIV + 1);

      model.indices.push(p1);
      model.indices.push(p2);
      model.indices.push(p1 + 1);

      model.indices.push(p1 + 1);
      model.indices.push(p2);
      model.indices.push(p2 + 1);
    }
  }

  model.definedVertices = model.vertices.length;
  model.indexCount = model.indices.length;
  console.log(model.indexCount);
  model.ready = true;

  return model;
}
