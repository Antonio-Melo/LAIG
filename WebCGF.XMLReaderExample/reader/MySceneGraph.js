
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	//Vectors to save things from dsx file
	this.views = [];
	this.illumination = [];
	this.lights = [];
	this.textures = [];
	this.materials = [];
	this.transformations = [];
	this.primitives = [];
	this.components = [];

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	// File reading
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/test.xml', this);
}
/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function(){
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	var error = this.parse(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

MySceneGraph.prototype.parse=function(rootElement){
	this.checkDsxOrder(rootElement);
	this.parseViews(rootElement);
	this.parseIllumination(rootElement);
	this.parseLights(rootElement);
	this.parseTextures(rootElement);
	this.parseMaterials(rootElement);
	this.parseTransformations(rootElement);
	this.parsePrimitives(rootElement);
	this.parseComponents(rootElement);
};

//Checks if .dsx file order is correct
MySceneGraph.prototype.checkDsxOrder = function(rootElement){
	var dsx =rootElement.children;

	if(dsx.length != 9){
		return "Wrong number of blocks in the dsx file";
	}

	if(dsx[0].nodeName != "scene"){
		return "Scene block missing in the dsx file";
	}

	if(dsx[1].nodeName != "views"){
		return "Views block missing in the dsx file";
	}

	if(dsx[2].nodeName != "illumination"){
		return "Illumination block missing in the dsx file";
	}

	if(dsx[3].nodeName != "lights"){
		return "Lights block missing in the dsx file";
	}

	if(dsx[4].nodeName != "textures"){
		return "Textures block missing in the dsx file";
	}

	if(dsx[5].nodeName != "materials"){
		return "Materials block missing in the dsx file";
	}

	if(dsx[6].nodeName != "transformations"){
		return "Transformations block missing in the dsx file";
	}

	if(dsx[7].nodeName != "primitives"){
		return "Primitives block missing in the dsx file";
	}

	if(dsx[8].nodeName != "components"){
		return "Components block missing in the dsx file";
	}
	console.debug("DSX order is correct");
}

//Parse Views
MySceneGraph.prototype.parseViews = function(rootElement) {
    var views = rootElement.getElementsByTagName('views')[0];
    if (views == null ) {
        return "views element is null.";
    }
    if (views.children.length == 0) {
        return "zero 'perspective' elements found.";
    }

    for (var i = 0; i < views.children.length; i++) {
        var node = views.children[i];
				var view = new View(node);
				this.views.push(view);
    }
		console.debug('VIEWS READ\n');
};
//Parse Illumination
MySceneGraph.prototype.parseIllumination = function(rootElement) {
    var ill = rootElement.getElementsByTagName('illumination')[0];
    if (ill == null ) {
        return "illumination element is null or missing.";
    }

		var illumination = new Illumination(ill);
		this.illumination.push(illumination);
		console.debug('ILLUMINATION READ\n');
};
//Parse lights
MySceneGraph.prototype.parseLights = function(rootElement) {
	    var lights = rootElement.getElementsByTagName('lights')[0];
	    if (lights == null ) {
	        return "lights element is null.";
	    }
	    if (lights.children.length == 0) {
	        return "zero 'lights' elements found.";
	    }

			var nomni = lights.getElementsByTagName('omni');

			for (var i = 0; i < nomni.length; i++) {
				var node = nomni[i];
				var omni = new Omni(node);
				this.lights.push(omni);
			}

			var nspot = lights.getElementsByTagName('spot');

			for (var i = 0; i < nspot.length; i++) {
				var node = nspot[i];
				var spot = new Spot(node);
				this.lights.push(spot);
			}
			console.debug('LIGHTS READ\n');
};
//Parse Textures
MySceneGraph.prototype.parseTextures = function(rootElement) {
	var texture = rootElement.getElementsByTagName('textures')[0];
	if (texture == null ) {
		return "textures element is null.";
	}

	if (texture.children.length == 0) {
		return "zero 'texture' elements found.";
	}

	for(var i = 0; i < texture.children.length; i++){
		var node = texture.children[i];
		var tex = new Textures(node);
		this.textures.push(tex);
	}
	console.debug('TEXTURES READ\n');
};

MySceneGraph.prototype.parseMaterials  = function(rootElement) {
		var material = rootElement.getElementsByTagName('materials')[0];
		if (material == null ) {
				return "materials element is null";
		}
		if (material.children.length == 0) {
				return "zero 'material' elements found.";
		}

		for(var i = 0; i < material.children.length; i++){
			var node = material.children[i];
			var materials = new Materials(node);
			this.materials.push(materials);
		}
		console.debug('MATERIALS READ\n');
};

MySceneGraph.prototype.parseTransformations  = function(rootElement) {
		var transf = rootElement.getElementsByTagName('transformations')[0];
		if (transf == null ) {
				return "transformations element is null.";
		}
		if (transf.children.length == 0) {
				return "zero 'transformation' elements found.";
		}

		for(var i = 0; i < transf.children.length; i++){
			var node = transf.children[i];
			if(node.children.length == 0){
				return "zero transformations inside the 'transformation' element";
			}
			var tran = new Transformation(node);
			this.transformations.push(tran);
		}
		console.debug('TRANSFORMATIONS READ\n');
};

MySceneGraph.prototype.parsePrimitives= function(rootElement) {

	var prim = rootElement.getElementsByTagName('primitives')[0];
	if(prim == null){
		return "primitives element is null";
	}

	if(prim.children.length == 0){
		return "zero 'primitives' elements found.";
	}

	// iterate over every element
	for (var i=0; i< prim.children.length; i++)
	{
		var node=prim.children[i];
		var p;
		switch (node.children[0].nodeName) {
			case "rectangle":
				p = new Rectangle(node.children[0]);
				break;
			case "triangle":
				p = new Triangle(node.children[0]);
				break;
			case "cylinder":
				p = new Cylinder(node.children[0]);
				break;
			case "sphere":
				p = new Sphere(node.children[0]);
				break;
			default:
				break;
		}
		this.primitives.push(p);
	}
	console.debug('PRIMATIVES READ\n');
};

MySceneGraph.prototype.parseComponents  = function(rootElement) {
		var comp = rootElement.getElementsByTagName('components')[0];
		if (comp == null ) {
				return "components element is null";
		}
		if (comp.children.length == 0) {
				return "zero 'component' elements found.";
		}

		for (var i = 0;i < comp.children.length; i++){
			var node = comp.children[i];
			var c = new Component(node);
			this.components.push(c);
		}

		console.debug('COMPUNENTS READ\n');
};

/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
