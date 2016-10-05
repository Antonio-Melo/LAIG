
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

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
MySceneGraph.prototype.onXMLReady=function()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseComponents(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
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
				this.rectangle = new Rectangle(node);
				break;
			case "triangle":
				this.triangle = new Triangle(node);
				break;
			case "cylinder":
				this.cylinder = new Cylinder(node);
				break;
			default:
				break;
		}
	}

};

MySceneGraph.prototype.parseViews = function(rootElement) {
    var views = rootElement.getElementsByTagName('views')[0];
    if (views == null ) {
        return "views element is missing.";
    }
    if (views.length < 0) {
        return "either zero or more than one 'views' element found.";
    }
    var nnodes = views.children.length;
    for (var i = 0; i < nnodes; i++) {


        var node = views.children[i];

		this.view = new View(node);

    }
};



MySceneGraph.prototype.parseIllumination = function(rootElement) {
    var ill = rootElement.getElementsByTagName('illumination')[0];
    if (ill == null ) {
        return "illumination element is missing.";
    }
    if (ill.length < 0) {
        return "either zero or more than one 'illumination' element found.";
    }

    var node = ill;

		this.illumination = new Illumination(node);

	};



	MySceneGraph.prototype.parseLights  = function(rootElement) {
	    var lights = rootElement.getElementsByTagName('lights')[0];
	    if (lights == null ) {
	        return "lights element is missing.";
	    }
	    if (lights.length < 0) {
	        return "either zero or more than one 'lights' element found.";
	    }

			var nomni = lights.getElementsByTagName('omni');

			for (var i = 0; i < nomni.length; i++) {

				var node = nomni[i];
				this.omni = new Omni(node);
			}

			var nspot = lights.getElementsByTagName('spot');

			for (var i = 0; i < nspot.length; i++) {

				var node = nspot[i];
				this.spot = new Spot(node);

			}
		};



		MySceneGraph.prototype.parseTextures  = function(rootElement) {
		    var texture = rootElement.getElementsByTagName('textures');
		    if (texture == null ) {
		        return "textures element is missing.";
		    }
		    if (texture.length < 0) {
		        return "either zero or more than one 'textures' element found.";
		    }

				for(var i = 0; i < texture.length; i++){

				var node = texture[0].children[i];
				this.textures = new Textures(node);

}
};

MySceneGraph.prototype.parseMaterials  = function(rootElement) {
		var material = rootElement.getElementsByTagName('materials');
		if (material == null ) {
				return "materials element is missing.";
		}
		if (material.length < 0) {
				return "either zero or more than one 'materials' element found.";
		}

		for(var i = 0; i < material.length; i++){

		var node = material[0].children[i];
		this.materials = new Materials(node);

}
};

MySceneGraph.prototype.parseTransformations  = function(rootElement) {
		var transf = rootElement.getElementsByTagName('transformations');
		if (transf == null ) {
				return "materials element is missing.";
		}
		if (transf.length < 0) {
				return "either zero or more than one 'materials' element found.";
		}

		for(var i = 0; i < transf.length; i++){

		var node = transf[0].children[i];
		this.transformation = new Transformation(node);

}
};

MySceneGraph.prototype.parseComponents  = function(rootElement) {
		var comp = rootElement.getElementsByTagName('components')[0];
		if (comp == null ) {
				return "components element is missing.";
		}
		if (comp.length < 0) {
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



	};




/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
