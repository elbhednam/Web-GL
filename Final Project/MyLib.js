var Colour = {
	BLUE: {R: 1.0, G: 0.0, B: 0.0},
	BLUE: {R: 0.0, G: 1.0, B: 0.0},
	SAKURA: {R: 1.0, G: 0.4, B: 0.74},
	WHITE: {R: 1.0, G: 1.0, B: 1.0}
};

var GateAngle = 0;


var cowPositions = [];
var cowAngles = [];

resetCows();

function resetCows(){
	
	cowPositions = [];
	cowAngles = [];
	
	// Cow1
	var cow1Pos = [-1.2, 0.15, 1.1];
	var cow1Ang = [0, 45, 0];

	var cow2Pos = [1, 0.15, -1];
	var cow2Ang = [0, 170, 0];

	var cow3Pos = [1, 0.15, 1.2];
	var cow3Ang = [0, 90, 0];
	
	var cow4Pos = [-1, 0.15, -1.2];
	var cow4Ang = [0, 43, 0];

	
	cowPositions.push(cow1Pos);
	cowAngles.push(cow1Ang);
	cowPositions.push(cow2Pos);
	cowAngles.push(cow2Ang);
	cowPositions.push(cow3Pos);
	cowAngles.push(cow3Ang);
	cowPositions.push(cow4Pos);
	cowAngles.push(cow4Ang);

}

function gateControl(open){

	if(open){
		if(GateAngle > -90){
			GateAngle -= 1;
		}
	}else{
		if(GateAngle < 0){
			GateAngle += 1;
		}
	}
	
}

function flipCow(n){
	cowAngles[n][2] = 180;
}
function unflipCow(n){
	cowAngles[n][2] = 0;
}


function cowController(){
	
	for(var i = 0; i < cowPositions.length; i++){
		if(cowPositions[i][1] > 0.15){
			cowPositions[i][1] -= 0.01;
		}
	}

}

// The everyday cow action
function jumpCow(n){
	cowPositions[n][1] += 0.1;
}

// SUper sophisticated cow AI, Smarted than Humans
function cowAI(n){
	
	cowAngles[n][1] += 1.5;
	cowPositions[n][0] += 0.01 * Math.cos((-cowAngles[n][1] + 90) * (Math.PI / 180));
	cowPositions[n][2] += 0.01 * Math.sin((-cowAngles[n][1] + 90) * (Math.PI / 180));
	
	if(OpenGate && GateAngle < -80){
		
		cowPositions[2][0] += 0.02 * Math.cos((-cowAngles[2][1] + 90) * (Math.PI / 180));
		cowPositions[2][2] += 0.02 * Math.sin((-cowAngles[2][1] + 90) * (Math.PI / 180));
		
	}
	
}

function makeGate(gl, pos, frotation, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, [0, frotation, 0], [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);

  // Fence
  positionIt(gl, [0.0, 0.0, 0], [0, 0.2, -0.4], [0.02, 0.1, 0.4], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.0, 1.0]); 

  g_MvpMatrix = popMatrix();  
}

function makeTree(gl, pos, frotation, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, frotation, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);

	// Base
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0, 0], [0.1, 0.1, 0.2], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.1, 0], [0.15, 0.1, 0.1], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.03, 0], [0.2, 0.1, 0.1], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]); 
  
  //trunk
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.4, 0], [0.1, 0.4, 0.1], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  
  //Branches
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.75, 0], [0.2, 0.05, 0.05], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.26, 0.8, 0], [0.1, 0.04, 0.04], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.3, 1, 0], [0.03, 0.2, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.85, 0.12], [0.05, 0.15, 0.05], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0, 1.0, 0.18], [0.03, 0.15, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  
  positionIt(gl, [0.0, 0.0, 0.0], [0, 1.0, -0.2], [0.04, 0.15, 0.04], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.8, -0.15], [0.05, 0.05, 0.1], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  
  positionIt(gl, [0.0, 0.0, 0.0], [0.2, 0.9, 0], [0.03, 0.2, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]);
  
  // Leaves
  positionIt(gl, [0.0, 0.0, 0.0], [0, 1.3, 0], [0.3, 0.3, 0.3], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.3, 1.1, 0], [0.2, 0.1, 0.2], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  
  positionIt(gl, [0.0, 0.0, 0.0], [-0.3, 1.1, 0.2], [0.17, 0.2, 0.2], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.25, 1.5, -0.2], [0.17, 0.16, 0.2], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  

  positionIt(gl, [0.0, 0.0, 0.0], [0, 1.3, 0.4], [0.2, 0.2, 0.2], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0, 1.1, -0.4], [0.2, 0.1, 0.2], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.3, 1.3, 0], [0.2, 0.2, 0.26], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.7, 0.2, 1.0]);
  

  g_MvpMatrix = popMatrix();  
}

function makeFence(gl, width, pos, frotation, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, frotation, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);

  // Fence
  positionIt(gl, [0.0, 0.0, 0.0], [width/10, 0.0, 0], [0.05, 0.2, 0.05], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.0, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [-width/10, 0.0, 0], [0.05, 0.2, 0.05], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.08, 0], [width/10, 0.05, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.4, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0, -0.08, 0], [width/10, 0.05, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.0, 1.0]); 

  g_MvpMatrix = popMatrix();  
}

function makeWaterFeeder(gl, pos, frotation, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, frotation, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);

  //Box
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.1, -0.25], [0.5, 0.1, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.4, 0.4, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.1, 0.0], [0.5, 0.1, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.4, 0.4, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [0.46, 0.1, -0.125], [0.03, 0.1, 0.1], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.4, 0.4, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [-0.46, 0.1, -0.125], [0.03, 0.1, 0.1], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.4, 0.4, 0.4, 1.0]); 
  
  //water
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.0, -0.15], [0.45, 0.14, 0.12], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.0, 0.4, 0.6, 1.0]); 


  g_MvpMatrix = popMatrix();  
}

function makeHut(gl, width, pos, frotation, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, frotation, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);

	// Body
  positionIt(gl, [0.0, 0.0, 0.0], [0, 0.2, 0], [0.8, 0.4, 0.04], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]); 
  // Roof
  positionIt(gl, [0, 0.0, 0], [0, 0.6, 0.0], [0.9, 0.055, 0.3], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBox1Tex(gl, 1, 0, u_ApplyTexture, u_Sampler);
  positionIt(gl, [0, 0.0, 0], [0, 0.7, 0.5], [0.9, 0.055, 0.3], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBox1Tex(gl, 1, 0, u_ApplyTexture, u_Sampler);
  positionIt(gl, [0, 0.0, 0], [0, 0.8, 1], [0.9, 0.055, 0.3], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBox1Tex(gl, 1, 0, u_ApplyTexture, u_Sampler);
  //Side
  positionIt(gl, [0.0, 0.0, 0.0], [-0.8, -0.08, 0.6], [0.05, 0.12, 0.6], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.5, 0.4, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [-0.8, 0.05, 0.6], [0.1, 0.02, 0.6], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.0, 1.0]); 
  
  //Posts
  positionIt(gl, [0.0, 0.0, 0.0], [-0.8, 0.3, 1.2], [0.06, 0.5, 0.06], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.0, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [0.8, 0.3, 1.2], [0.06, 0.5, 0.06], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.0, 1.0]); 


  g_MvpMatrix = popMatrix();  
}

function makeChicken(gl, rot, pos, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, rot, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);
  
  // Body
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, -0.005, 0.0], [0.03, 0.025, 0.05], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [1, 1, 1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.02, 0.02], [0.03, 0.05, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [1, 1, 1, 1.0]);
  
  // Wingus
  positionIt(gl, [0.0, 0.0, 0.0], [0.03, 0.0, 0.0], [0.005, 0.015, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.03, 0.0, 0.0], [0.005, 0.015, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.8, 1.0]);
  
  // Flock HEAD DICK
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.075, 0.02], [0.01, 0.005, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [1, 0.4, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.08, 0.025], [0.01, 0.01, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [1, 0.4, 0.4, 1.0]);
  
  // Beeeeeeek
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.03, 0.05], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [1, 0.4, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.02, 0.05], [0.01, 0.01, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [1, 0.4, 0.4, 1.0]);
  
  // Eyes
  positionIt(gl, [0.0, 0.0, 0.0], [0.03, 0.05, 0.025], [0.005, 0.005, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0, 0, 0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.03, 0.05, 0.025], [0.005, 0.005, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0, 0, 0, 1.0]);
  
  // Claws
  positionIt(gl, [0.0, 0.0, 0.0], [0.02, -0.04, 0.0], [0.005, 0.015, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.03, -0.05, 0.01], [0.005, 0.005, 0.015], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.01, -0.05, 0.01], [0.005, 0.005, 0.015], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.0, 1.0]);
  
  positionIt(gl, [0.0, 0.0, 0.0], [-0.02, -0.04, 0.0], [0.005, 0.015, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.03, -0.05, 0.01], [0.005, 0.005, 0.015], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.01, -0.05, 0.01], [0.005, 0.005, 0.015], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.8, 0.0, 1.0]);
  
  g_MvpMatrix = popMatrix();  

} 


function makePig(gl, rot, pos, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, rot, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);
  
  // Body
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.0, 0.02], [0.07, 0.08, 0.12], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  // Head
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.04, 0.1], [0.09, 0.08, 0.08], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  // Snout
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.02, 0.19], [0.04, 0.025, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.5, 0.5, 1.0]);  
	
  positionIt(gl, [0.0, 0.0, 0.0], [-0.02, 0.02, 0.2], [0.01, 0.01, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.02, 0.02, 0.2], [0.01, 0.01, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.4, 1.0]);
  
 
  // Black
  positionIt(gl, [0.0, 0.0, 0.0], [-0.032, 0.07, 0.181], [0.01, 0.018, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.0, 0.0, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.032, 0.07, 0.181], [0.01, 0.018, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.0, 0.0, 0.0, 1.0]);
  
  // Ears
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, 0.12, 0.10], [0.02, 0.03, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, 0.12, 0.10], [0.02, 0.03, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.5, 0.5, 1.0]);
  
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, 0.14, 0.11], [0.02, 0.01, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, 0.14, 0.11], [0.02, 0.01, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.5, 0.5, 1.0]);
 
 // Feets Front
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, -0.08, 0.12], [0.02, 0.04, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, -0.12, 0.12], [0.021, 0.01, 0.021], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, -0.08, 0.12], [0.02, 0.04, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, -0.12, 0.12], [0.021, 0.01, 0.021], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  // Feets Back
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, -0.08, -0.08], [0.02, 0.04, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, -0.12, -0.08], [0.021, 0.01, 0.021], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, -0.08, -0.08], [0.02, 0.04, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, -0.12, -0.08], [0.021, 0.01, 0.021], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
 
  // tail
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.0, -0.1], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.02, 0.05, -0.11], [0.01, 0.07, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.12, -0.11], [0.03, 0.01, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.02, 0.07, -0.11], [0.01, 0.04, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.7, 0.5, 0.5, 1.0]);
 
  g_MvpMatrix = popMatrix();  

} 


function makeCow(gl, rot, pos, u_ApplyTexture, u_Sampler, u_MvpMatrix, u_Color, u_UseColor, u_NormalMatrix){

  //Base
  positionIt(gl, rot, [pos[0], pos[1], pos[2]], [1, 1, 1], u_MvpMatrix, u_NormalMatrix, true, false, false);
  //drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);
  
  // Body
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.014, 0], [0.09, 0.065, 0.16], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]); 
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.09, 0], [0.08, 0.01, 0.158], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]); 
 
  // Head
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.15, 0.12], [0.08, 0.07, 0.06], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  
  //Snout
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.12, 0.18], [0.06, 0.03, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.72, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.1, 0.17], [0.04, 0.03, 0.014], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.65, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.025, 0.12, 0.2], [0.01, 0.01, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.4, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.025, 0.12, 0.2], [0.01, 0.01, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.6, 0.3, 0.4, 1.0]);
  
  // Eyes white
  positionIt(gl, [0.0, 0.0, 0.0], [0.037, 0.16, 0.18], [0.016, 0.04, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.037, 0.16, 0.18], [0.016, 0.04, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.9, 0.9, 1.0]);
  // Black
  positionIt(gl, [0.0, 0.0, 0.0], [-0.032, 0.16, 0.181], [0.012, 0.03, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.0, 0.0, 0.0, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.032, 0.16, 0.181], [0.012, 0.03, 0.001], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.0, 0.0, 0.0, 1.0]);
  
  // Horns
  positionIt(gl, [0.0, 0.0, 0.0], [0.05, 0.23, 0.10], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.05, 0.23, 0.10], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);

  // Ears
  positionIt(gl, [0.0, 0.0, 0.0], [0.08, 0.18, 0.12], [0.02, 0.01, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.1, 0.16, 0.12], [0.008, 0.03, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.08, 0.18, 0.12], [0.02, 0.01, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.1, 0.16, 0.12], [0.008, 0.03, 0.02], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  
  // Feets Front
  positionIt(gl, [0.0, 0.0, 0.0], [0.064, -0.08, 0.12], [0.025, 0.04, 0.025], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.064, -0.12, 0.12], [0.026, 0.01, 0.026], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.064, -0.08, 0.12], [0.025, 0.04, 0.025], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.064, -0.12, 0.12], [0.026, 0.01, 0.026], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  // Feet back
  positionIt(gl, [0.0, 0.0, 0.0], [0.064, -0.08, -0.12], [0.025, 0.04, 0.025], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.064, -0.12, -0.12], [0.026, 0.01, 0.026], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.064, -0.08, -0.12], [0.025, 0.04, 0.025], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.75, 0.75, 0.75, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.064, -0.12, -0.12], [0.026, 0.01, 0.026], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);

  // Bell Boy
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, 0.0, 0.17], [0.025, 0.025, 0.008], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.7, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, -0.03, 0.165], [0.01, 0.01, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.7, 0.1, 1.0]);
  // Chain
  positionIt(gl, [0.0, 0.0, 0.0], [0.035, 0.035, 0.165], [0.01, 0.01, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.7, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.055, 0.065, 0.165], [0.01, 0.02, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.7, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.035, 0.035, 0.165], [0.01, 0.01, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.7, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.055, 0.065, 0.165], [0.01, 0.02, 0.005], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.9, 0.7, 0.1, 1.0]);
  
  // Teh UUUtaarrs
  positionIt(gl, [0.0, 0.0, 0.0], [0.0, -0.06, -0.02], [0.05, 0.02, 0.05], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.65, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.025, -0.09, -0.045], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.65, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.025, -0.09, -0.045], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.65, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.025, -0.09, 0.01], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.65, 0.8, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [-0.025, -0.09, 0.01], [0.01, 0.01, 0.01], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.8, 0.65, 0.8, 1.0]);
  
  // SPOOOOOTS
  //Head Left
  positionIt(gl, [0.0, 0.0, 0.0], [0.0501, 0.1901, 0.1501], [0.03, 0.03, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  // Head top back
  positionIt(gl, [0.0, 0.0, 0.0], [-0.0501, 0.1901, 0.0899], [0.03, 0.03, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  // Leg right
  positionIt(gl, [0.0, 0.0, 0.0], [-0.0701, -0.02501, 0.1301], [0.02, 0.03, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  // Left body
  positionIt(gl, [0.0, 0.0, 0.0], [-0.0701, 0.04, -0.1001], [0.02, 0.04, 0.06], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  //Right Body
  positionIt(gl, [0.0, 0.0, 0.0], [0.0701, 0.0, -0.0], [0.02, 0.04, 0.06], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  positionIt(gl, [0.0, 0.0, 0.0], [0.0701, 0.02, -0.05], [0.02, 0.03, 0.03], u_MvpMatrix, u_NormalMatrix, true, true, true);
  drawBoxSolid(gl, u_ApplyTexture, u_Sampler, u_UseColor, u_Color, [0.3, 0.1, 0.1, 1.0]);
  
  g_MvpMatrix = popMatrix();  

} 



