/**
 * MyInterface
 * @constructor
 */
function MyInterface(scene) {
	//call CGFinterface constructor
	CGFinterface.call(this);
	this.scene = scene;
	scene.interface = this;


	this.gui = new dat.GUI();

  this.lights=this.gui.addFolder("Lights");
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	CGFinterface.prototype.init.call(this, application);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	CGFinterface.prototype.processKeyboard.call(this,event);
	switch (event.keyCode)
	{
		case (118):			// v
			this.scene.graph.changeView();
			this.setActiveCamera(this.scene.camera);
			console.debug("v\n");
			break;
		case (109):				//m
			this.scene.graph.changeMaterial();
			console.debug("m\n");
			break;
	};
};

MyInterface.prototype.onGraphLoaded = function ()
{
    if (this.scene.light1 != null) { this.lights.add(this.scene, 'light1').name(this.scene.graph.lights[0].id); }
    else { this.scene.light1 = false; }

    if (this.scene.light2 != null) { this.lights.add(this.scene, 'light2').name(this.scene.graph.lights[1].id); }
    else { this.scene.light2 = false; }

    if (this.scene.light3 != null) { this.lights.add(this.scene, 'light3').name(this.scene.graph.lights[2].id); }
    else { this.scene.light3 = false; }

    if (this.scene.light4 != null) { this.lights.add(this.scene, 'light4').name(this.scene.graph.lights[3].id); }
    else { this.scene.light4 = false; }

    if (this.scene.light5 != null) { this.lights.add(this.scene, 'light5').name(this.scene.graph.lights[4].id); }
    else { this.scene.light5 = false; }

    if (this.scene.light6 != null) { this.lights.add(this.scene, 'light6').name(this.scene.graph.lights[5].id); }
    else { this.scene.light6 = false; }

    if (this.scene.light7 != null) { this.lights.add(this.scene, 'light7').name(this.scene.graph.lights[6].id); }
    else { this.scene.light7 = false; }

    if (this.scene.light8 != null) { this.lights.add(this.scene, 'light8').name(this.scene.graph.lights[7].id); }
    else { this.scene.light8 = false; }
}
