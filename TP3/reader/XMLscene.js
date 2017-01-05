
function XMLscene() {
    CGFscene.call(this);
    this.time = 30000;
    this.timepassed = 0;
    this.style = "wood";
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();
    this.enableTextures(true);


    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	  this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.setUpdatePeriod(1);

	  this.axis=new CGFaxis(this);
    this.GameState = new GameState(this);
    this.Table = new Cylinder(this,"table",40,40,5,40,40);
    this.AppearanceMetal = new CGFappearance(this);
    this.AppearanceMetal.loadTexture("textures\\metal.jpg");
    this.AppearanceWood = new CGFappearance(this);
    this.AppearanceWood.loadTexture("textures\\wood.jpg");
    this.AppearanceRock = new CGFappearance(this);
    this.AppearanceRock.loadTexture("textures\\rock.jpg");
    this.setPickEnabled(true);
};

XMLscene.prototype.initLights = function () {
  this.lights[0].setPosition(2, 3, 3, 1);
  this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
  this.lights[0].update();
  this.light1 = null;
  this.light2 = null;
  this.light3 = null;
  this.light4 = null;
  this.light5 = null;
  this.light6 = null;
  this.light7 = null;
  this.light8 = null;
};

XMLscene.prototype.initCameras = function () {
   this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(1, 1, 1), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
  this.setAmbient(0.2, 0.4, 0.8, 1.0);
  this.setDiffuse(0.2, 0.4, 0.8, 1.0);
  this.setSpecular(0.2, 0.4, 0.8, 1.0);
  this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function ()
{
	this.lights[0].setVisible(true);
  this.lights[0].enable();

  this.interface.onGraphLoaded();
};
XMLscene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0]; // o objeto seleccionado
				if (obj){
					var customId = this.pickResults[i][1]; // o ID do objeto seleccionado
					console.log("Picked object: " + obj + ", with pick id " + customId);
          this.GameState.processPick(customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}

XMLscene.prototype.display = function () {
  this.logPicking();
  this.clearPickRegistration();
	// Clear image and depth buffer everytime we update the scene
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
  this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();


	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
    this.updateLights();
    for(var i = 0;i <this.lights.length;i++){
		  this.lights[i].update();
    }
    this.graph.displayGraph();
    this.GameState.display();

    //Table
    this.pushMatrix();
    this.translate(0,-5.1,0);
    this.rotate(-Math.PI/2,1,0,0);
    switch (this.style) {
      case "wood":
        this.AppearanceWood.apply();
        break;
      case "rock":
        this.AppearanceRock.apply();
        break;
      case "metal":
        this.AppearanceMetal.apply();
      default:

    }
    this.Table.display();
    this.popMatrix();
	};
};

XMLscene.prototype.primitivesDisplay = function(){
};

XMLscene.prototype.updateLights = function() {
	if (this.light1) { this.lights[0].enable(); }
	else { this.lights[0].disable(); }

	if (this.light2) { this.lights[1].enable(); }
	else { this.lights[1].disable(); }

	if (this.light3) { this.lights[2].enable(); }
	else { this.lights[2].disable(); }

	if (this.light4) { this.lights[3].enable(); }
	else { this.lights[3].disable(); }

	if (this.light5) { this.lights[4].enable(); }
	else { this.lights[4].disable(); }

	if (this.light6) { this.lights[5].enable(); }
	else { this.lights[5].disable(); }

	if (this.light7) { this.lights[6].enable(); }
	else { this.lights[6].disable(); }

	if (this.light8) { this.lights[7].enable(); }
	else { this.lights[7].disable(); }
}
XMLscene.prototype.update = function (currTime) {



  var curr_time = new Date();
	var diff = Math.floor((currTime-this.timepassed)/1000);
	var minutes = Math.floor(diff/60);
	var seconds = Math.floor(diff%60);
	var formatted_time = "";
	if (minutes < 10) {
		formatted_time += "0";
	}
	formatted_time += minutes + ":";
	if (seconds < 10) {
		formatted_time += "0";
	}
	formatted_time += seconds;
	document.getElementById('turn-time-countdown').innerHTML = formatted_time;
  //console.debug(this.time);
  if(currTime - this.timepassed >= this.time){
    if(this.GameState.PlayerinGame == "1"){
      this.GameState.PlayerinGame = "2";
      this.GameState.changeBackgroundColorPlayer(1);
    }else{
      this.GameState.PlayerinGame = "1";
      this.GameState.changeBackgroundColorPlayer(2);
    }
    this.timepassed = currTime;
  }

  if(this.graph.loadedOk){
    for(var id in this.graph.animations)
      this.graph.animations[id].update(currTime);
  }
  if(this.GameState.animation != null) {
    if(this.GameState.animation.finished == false)
      this.GameState.animation.update(currTime);
    else   this.GameState.animation = null;
  }

  if(localStorage.undo == 'true'){
    this.GameState.undo();
    localStorage.undo = false;
  }
};
