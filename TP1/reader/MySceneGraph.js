
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	//Vectors to save things from dsx file
	this.views = [];
	this.viewsIndex = 0;
	this.materialIndex = 0;
	this.illumination;
	this.lights = [];
	this.textures = {};
	this.materials = {};
	this.transformations = {};
	this.nodes = {};

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

//Global Parser
MySceneGraph.prototype.parse=function(rootElement){
	console.log("READING DSX FILE ==============================");
	this.checkDsxOrder(rootElement);
	this.parseScene(rootElement);
	this.parseViews(rootElement);
	this.parseIllumination(rootElement);
	this.parseLights(rootElement);
	this.parseTextures(rootElement);
	this.parseMaterials(rootElement);
	this.parseTransformations(rootElement);
	this.parsePrimitives(rootElement);
	this.parseComponents(rootElement);
	console.log("DSX FILE READ =================================");
};
//Checks if .dsx file order is correct
MySceneGraph.prototype.checkDsxOrder = function(rootElement){
	var dsx =rootElement.children;

	if(dsx.length != 9){
		this.onXMLError("Wrong number of blocks in the dsx file");
	}

	if(dsx[0].nodeName != "scene"){
		this.onXMLError("Scene block missing in the dsx file");
	}

	if(dsx[1].nodeName != "views"){
		this.onXMLError("Views block missing in the dsx file");
	}

	if(dsx[2].nodeName != "illumination"){
		this.onXMLError("Illumination block missing in the dsx file");
	}

	if(dsx[3].nodeName != "lights"){
		this.onXMLError("Lights block missing in the dsx file");
	}

	if(dsx[4].nodeName != "textures"){
		this.onXMLError("Textures block missing in the dsx file");
	}

	if(dsx[5].nodeName != "materials"){
		this.onXMLError("Materials block missing in the dsx file");
	}

	if(dsx[6].nodeName != "transformations"){
		this.onXMLError("Transformations block missing in the dsx file");
	}

	if(dsx[7].nodeName != "primitives"){
		this.onXMLError("Primitives block missing in the dsx file");
	}

	if(dsx[8].nodeName != "components"){
		this.onXMLError("Components block missing in the dsx file");
	}
	console.log("DSX order is correct");
}
//Parse Scene
MySceneGraph.prototype.parseScene= function (rootElement){
	var scene = rootElement.getElementsByTagName('scene')[0];

	//root attribute
	this.root_id = this.reader.getString(scene,"root");
	//console.debug(this.root_id);
	if(this.root_id == null){
		this.onXMLError("Error reading root attribute in scene block");
	}

	//axis_lenght attribute
	this.axis_length = this.reader.getFloat(scene,"axis_length");
	if(this.axis_length == null || this.axis_length <=0){
		this.onXMLError("Erros reading axis_lenght attribute in scene block \n Either missing or negative");
	}
	this.scene.axis=new CGFaxis(this.scene,this.axis_length,0.2);
	console.log("SCENE READ");
}
//Parse Views
MySceneGraph.prototype.parseViews = function(rootElement) {
    var nviews = rootElement.getElementsByTagName('views')[0];

    if (nviews == null ) {
    	this.onXMLError("views element is null.");
    }
    if (nviews.children.length == 0) {
    	this.onXMLError("zero 'perspective' elements found.");
    }
		//Reads all perspectives
    for (var i = 0; i < nviews.children.length; i++) {
        var node = nviews.children[i];
				var view = new View(node);
				this.views.push(view);
    }

		//Default Camera
		this.changeView();
		this.scene.interface.setActiveCamera(this.scene.camera);
		console.log('VIEWS READ\n');
};
//ChangeView
MySceneGraph.prototype.changeView = function(){
	this.defaultLight = this.views[this.viewsIndex];
	this.scene.camera = new CGFcamera(this.defaultLight.angle,
		 																this.defaultLight.near,
																		this.defaultLight.far,
																		vec3.fromValues(this.defaultLight.fromX,this.defaultLight.fromY, this.defaultLight.fromZ),
																		vec3.fromValues(this.defaultLight.toX, this.defaultLight.toY, this.defaultLight.toZ));

	if(++this.viewsIndex < this.views.length){
		this.viewsIndex = this.viewsIndex++;
  }else{
		this.viewsIndex = 0;
	}
}
//Parse Illumination
MySceneGraph.prototype.parseIllumination = function(rootElement) {
    var ill = rootElement.getElementsByTagName('illumination')[0];
    if (ill == null ) {
    	this.onXMLError("illumination element is null or missing.");
    }

		this.illumination = new Illumination(ill);
		this.scene.gl.clearColor(this.illumination.rb,this.illumination.gb,this.illumination.bb,this.illumination.ab);
		//this.scene.setGlobalAmbientLight(this.illumination.ra,this.illumination.ga,this.illumination.ba,this.illumination.aa);
		console.log('ILLUMINATION READ\n');
};
//Parse lights
MySceneGraph.prototype.parseLights = function(rootElement) {
	    var lights = rootElement.getElementsByTagName('lights')[0];
	    if (lights == null ) {
	    	this.onXMLError("lights element is null.");
	    }
	    if (lights.children.length == 0) {
	    	this.onXMLError("zero 'light' elements found.");
	    }
			if(lights.children.length > 8){
				this.onXMLError("not possible to represent more than 8 lights in the scene");
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
			if(!this.checkIds(this.lights)){
					this.onXMLError("Ids repeted in Lights");
			}
			this.enableLights();
			console.log('LIGHTS READ\n');
};
//enableLights
MySceneGraph.prototype.enableLights = function(){
	//console.debug(this.scene.lights.length);
	for(var i = 0;i < this.lights.length;i++){
		 var ls = this.scene.lights[i];
		 var ld = this.lights[i];

		 ls.setPosition(ld.lx,ld.ly,ld.lz);
		 ls.setAmbient(ld.ar,ld.ag,ld.ab,ld.aa);
		 ls.setDiffuse(ld.dr,ld.dg,ld.db,ld.da);
		 ls.setSpecular(ld.sr,ld.sg,ld.sb,ld.sa);

		 if(ld.tx != null){
			 ls.setSpotDirection(ld.tx,ld.ty,ld.tz);
			 ls.setSpotCutOff(ld.angle);
			 ls.setSpotExponent(ld.exponent);
		 }
		 if(ld.enabled){
			 ls.enable();
		 }
		 ls.setVisible(true);
		 ls.update();
	}
}
//Parse Textures
MySceneGraph.prototype.parseTextures = function(rootElement) {
	var texture = rootElement.getElementsByTagName('textures')[0];
	if (texture == null ) {
		this.onXMLError("textures element is null.");
	}

	if (texture.children.length == 0) {
		this.onXMLError("zero 'texture' elements found.");
	}

	for(var i = 0; i < texture.children.length; i++){
		var node = texture.children[i];
		var tex = new Textures(node,this.scene);
		if(this.textures[tex.id] == null){
			this.textures[tex.id]= tex;
		}else{
			this.onXMLError("Ids repeted in Textures");
		}
	}
	console.log('TEXTURES READ\n');
};
//Parse Materials
MySceneGraph.prototype.parseMaterials  = function(rootElement) {
		var material = rootElement.getElementsByTagName('materials')[0];
		if (material == null ) {
			this.onXMLError("materials element is null");
		}
		if (material.children.length == 0) {
			this.onXMLError("zero 'material' elements found.");
		}

		for(var i = 0; i < material.children.length; i++){
			var node = material.children[i];
			var materials = new Materials(node);

			var appear = new CGFappearance(this.scene);
	    appear.setEmission(materials.er,materials.eg,materials.eb,materials.ea);
			appear.setAmbient(materials.ar,materials.ag,materials.ab,materials.aa);
			appear.setDiffuse(materials.dr,materials.dg,materials.db,materials.da);
			appear.setSpecular(materials.sr,materials.sg,materials.sb,materials.sa);
			appear.setShininess(materials.value);

			if(this.materials[materials.id] == null){
				this.materials[materials.id] = appear;
			}else {
				this.onXMLError("Ids repeted in Materials");
			}
		}

		console.log('MATERIALS READ\n');
};
//Parse Transformations
MySceneGraph.prototype.parseTransformations  = function(rootElement) {
		var transf = rootElement.getElementsByTagName('transformations')[0];
		if (transf == null ) {
			this.onXMLError("transformations element is null.");
		}
		if (transf.children.length == 0) {
			this.onXMLError("zero 'transformation' elements found.");
		}

		for(var i = 0; i < transf.children.length; i++){
			var node = transf.children[i];
			if(node.children.length == 0){
				this.onXMLError("zero transformations inside the 'transformation' element");
			}
			var tran = new Transformation(node);
			if(this.transformations[tran.id] == null){
					this.transformations[tran.id] = tran;
			}else{
				this.onXMLError("Ids repeted in Transformations");
			}
		}

		console.log('TRANSFORMATIONS READ\n');
};
//Parse Primitives
MySceneGraph.prototype.parsePrimitives= function(rootElement) {
	var prim = rootElement.getElementsByTagName('primitives')[0];
	if(prim == null){
		this.onXMLError("primitives element is null");
	}

	if(prim.children.length == 0){
		this.onXMLError("zero 'primitives' elements found.");
	}

	// iterate over every element
	for (var i=0; i< prim.children.length; i++)
	{
		var node=prim.children[i];
		var p;
		switch (node.children[0].nodeName) {
			case "rectangle":
				p = new Rectangle(node.children[0], this.scene,this.reader.getString(node,'id'));
				break;
			case "triangle":
				p = new Triangle(node.children[0],this.scene,this.reader.getString(node,'id'));
				break;
			case "cylinder":
				p = new Cylinder(node.children[0],this.scene,this.reader.getString(node,'id'));
				break;
			case "sphere":
				p = new Sphere(node.children[0],this.scene,this.reader.getString(node,'id'));
				break;
			case "torus":
				p = new Torus(node.children[0],this.scene,this.reader.getString(node,'id'));
				break;
			default:
				break;
		}
		if(this.nodes[p.id] ==null){
			this.nodes[p.id] =p;
		}else {
			this.onXMLError("Ids repeted in primitives");
		}
	}
	console.log('PRIMATIVES READ\n');
};
//Parse Components
MySceneGraph.prototype.parseComponents = function(rootElement) {
		var comp = rootElement.getElementsByTagName("components")[0];

		if (comp == null ) {
			this.onXMLError("components element is null");
		}
		if (comp.children.length == 0) {
			this.onXMLError("zero 'component' elements found.");
		}

		for (var i = 0;i < comp.children.length; i++){
			var node = comp.children[i];
			var c = new Component(node,this);

			if(this.nodes[c.id] == null){
				this.nodes[c.id] = c;
			}else{
				this.onXMLError("Ids repeted in Components");
			}
		}
		console.log('COMPUNENTS READ\n');
};
//Checks vector for elements with the same id
MySceneGraph.prototype.checkIds = function (vector){
	for(var i = 0; i < vector.length;i++){
		var v = vector[i];
		var nfound = 0;
		for(var x = 0;x <vector.length;x++){
			if(v.id == vector[x].id){
				nfound++;
			}
		}
		if(nfound != 1){
			return false;
		}
	}
	return true;
}


//Read graph
MySceneGraph.prototype.displayGraph = function(){
	var textureStack = Stack.stack();
	var materialStack = Stack.stack();

	transformationStack.push(mat4.create());
	this.visitGraph(this.root_id,textureStack,materialStack);
}
MySceneGraph.prototype.visitGraph = function(node_id,textureStack,materialStack){
	var node = this.nodes[node_id];

	if(node instanceof Component ){

		//Apply transformations
		this.scene.pushMatrix();
		this.scene.multMatrix(this.transformations[node.transref].matrix);

		//Apply materials
		var materialId = node.materials[this.materialIndex];
		if(materialId == "inherit"){
			materialStack.push(materialStack.top());
		}else{
			materialStack.push(materialId);
		}

		//Textures
		if(node.textureid == "inherit"){
			textureStack.push(textureStack.top());
		}else{
			textureStack.push(node.textureid);
		}
		for(var i = 0; i < node.children.length;i++){
			this.visitGraph(node.children[i],textureStack,materialStack);
		}
		this.scene.popMatrix();
		materialStack.pop();
		textureStack.pop();
	}else{

		var material = this.materials[materialStack.top()];
		var texture = this.textures[textureStack.top()].texture;
		if(textureStack.top() != "none"){
			material.setTexture(texture);
		}

		material.apply();
		node.display();
		material.setTexture(null);
	}






}

/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
