
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	this.listRectangles=[];
	this.listTriangles=[];
	this.listCylinders=[];
	this.listSpheres=[];
	this.listTorus =[];

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
	var error = this.parsePrimitives(rootElement);

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
				this.listRectangles.push(this.rectangle);
				break;
			case "triangle":
				this.triangle = new Triangle(node);
				this.listTriangles.push(this.triangle);
				break;
			case "cylinder":
				this.cylinder = new Cylinder(node);
				this.listCylinders.push(this.cylinder);
				break;
			case "sphere":
				this.sphere = new Sphere(node);
				this.listSpheres.push(this.sphere);
				break;
			case "torus":
				this.torus = new Torus(node);
				this.listTorus.push(this.torus);
				break;
			default:
				break;
		}
	};

/*
	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}


	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};*/

};


/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
