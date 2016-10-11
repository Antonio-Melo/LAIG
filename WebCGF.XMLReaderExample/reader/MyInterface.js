/**
 * MyInterface
 * @constructor
 */
function MyInterface(scene) {
	//call CGFinterface constructor
	CGFinterface.call(this);
	this.scene = scene;
	scene.interface = this;
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
	};
};
