/*
  Class that represents a cylinder primitive in the scene
*/


 function Cylinder(node,scene) {
 	CGFobject.call(this,scene);

  this.node = node;

  this.base = node.attributes.getNamedItem("base").value;
  this.top = node.attributes.getNamedItem("top").value;
  this.height = node.attributes.getNamedItem("height").value;

  this.slices = node.attributes.getNamedItem("slices").value;
  this.stacks = node.attributes.getNamedItem("stacks").value;
  console.debug("Cylinder "+this.base+"\n");
 	this.initBuffers();
 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {


	var counter = 0;
	var n = 0;
	var angle = 2 * Math.PI / this.slices;
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];


for(j = 0; j < this.stacks; j++){
	for( i = 0; i < this.slices; i++ ){

		this.vertices.push(Math.cos(counter), Math.sin(counter), (j+1)*(1/this.stacks));
		this.vertices.push(Math.cos(counter), Math.sin(counter),  (j)*(1/this.stacks));
		this.normals.push(Math.cos(counter), Math.sin(counter), 0);
		this.normals.push(Math.cos(counter), Math.sin(counter), 0);
		this.texCoords.push(0.5+0.5*Math.cos(counter), j+1);
		this.texCoords.push(0.5+0.5*Math.cos(counter), j);

		counter += angle;
		this.vertices.push(Math.cos(counter), Math.sin(counter), (j+1)*(1/this.stacks));
		this.vertices.push(Math.cos(counter), Math.sin(counter),  (j)*(1/this.stacks));
		this.normals.push(Math.cos(counter), Math.sin(counter), 0);
		this.normals.push(Math.cos(counter), Math.sin(counter), 0);
		this.texCoords.push(0.5+0.5*Math.cos(counter), j+1);
		this.texCoords.push(0.5+0.5*Math.cos(counter), j);

		this.indices.push(n++);
		this.indices.push(n++);
		this.indices.push(n++);
		this.indices.push(n--);
		this.indices.push(n--);
		this.indices.push(n++);

		n += 2;

	}
}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
