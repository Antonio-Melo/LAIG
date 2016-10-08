
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
	this.parseViews(rootElement);
	this.parseIllumination(rootElement);
	this.parseLights(rootElement);
	this.parseTextures(rootElement);
	this.parseMaterials(rootElement);
	this.parseTransformations(rootElement);
	this.parsePrimitives(rootElement);
	this.parseComponents(rootElement);
};

MySceneGraph.prototype.parseViews = function(rootElement) {
    var views = rootElement.getElementsByTagName('views')[0];
    if (views == null ) {
        return "views element is missing.";
    }
    if (views.length <= 0) {
        return "zero 'perspective' elements found.";
    }
    var nnodes = views.children.length;
    for (var i = 0; i < nnodes; i++) {
        var node = views.children[i];
				var view = new View(node);
				this.views.push(view);
    }
		console.debug('VIEWS READ\n');
};

MySceneGraph.prototype.parseIllumination = function(rootElement) {
    var ill = rootElement.getElementsByTagName('illumination')[0];
    if (ill == null ) {
        return "illumination element is missing.";
    }

    var node = ill;

		var illumination = new Illumination(node);
		this.illumination.push(illumination);
		console.debug('ILLUMINATION READ\n');
};

MySceneGraph.prototype.parseLights = function(rootElement) {
	    var lights = rootElement.getElementsByTagName('lights')[0];
	    if (lights == null ) {
	        return "lights element is missing.";
	    }
	    if (lights.length <= 0) {
	        return "zero 'lights' element found.";
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

MySceneGraph.prototype.parseTextures = function(rootElement) {
	var texture = rootElement.getElementsByTagName('textures');
	if (texture == null ) {
		return "textures element is missing.";
	}
	if (texture.length == 0) {
		return "zero 'texture' element found.";
	}

	for(var i = 0; i < texture.length; i++){
		var node = texture[0].children[i];
		var textures = new Textures(node);
		this.textures.push(textures);
	}
	console.debug('TEXTURES READ\n');
};

MySceneGraph.prototype.parseMaterials  = function(rootElement) {
		var material = rootElement.getElementsByTagName('materials');
		if (material == null ) {
				return "materials element is missing.";
		}
		if (material.length == 0) {
				return "zero 'materials' element found.";
		}
		console.debug(material.length + '\n');
		for(var i = 0; i < material.length; i++){
			var node = material[0].children[i];
			console.debug('Estou aqui 1\n');
			var materials = new Materials(node);
			console.debug('Estou aqui 2\n');
			this.materials.push(materials);
		}
		console.debug('MATERIALS READ\n');
};

MySceneGraph.prototype.parseTransformations  = function(rootElement) {
		var transf = rootElement.getElementsByTagName('transformations');
		if (transf == null ) {
				return "materials element is missing.";
		}
		if (transf.length <= 0) {
				return "zero 'materials' element found.";
		}

		for(var i = 0; i < transf.length; i++){
			var node = transf[0].children[i];
			var transformation = new Transformation(node);
			this.transformations.push(transformation);
		}
		console.debug('TRANSFORMATIONS READ\n');
};

MySceneGraph.prototype.parsePrimitives= function(rootElement) {

	var prim = rootElement.getElementsByTagName('primitives');
	if(prim == null){
		return "No primitives found";
	}

	if(prim.length !=1){
		return "either zero or more than one 'primitives' element found.";
	}
	var primitives = prim[0];

	// iterate over every element
	var nnodes=primitives.children.length;
	for (var i=0; i< nnodes; i++)
	{
		var node=primitives.children[i];
		switch (node.nodeName) {
			case "rectangle":
				var p = new Rectangle(node);
				break;
			case "triangle":
				var p = new Triangle(node);
				break;
			case "cylinder":
				var p = new Cylinder(node);
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
				return "components element is missing.";
		}
		if (comp.length <= 0) {
				return "either zero or more than one 'components' element found.";
		}

		var transf = comp.getElementsByTagName('transformation');

		for (var i = 0; i < transf.length; i++) {

			var node = transf[i];
			this.transformation = new Transformation(node);
		}

		var materials = comp.getElementsByTagName('materials');

		for (var i = 0; i < materials.length; i++) {

			var node = materials[i];
			this.material = new Materials(node);
		}

			var text = comp.getElementsByTagName('texture');

			for (var i = 0; i < text.length; i++) {

				var node = text[i];
				this.texture = new Textures(node);
			}

			var child = comp.getElementsByTagName('children');

			for (var i = 0; i < child.length; i++) {

				var node = child[i];
				this.children = new Children(node);
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
