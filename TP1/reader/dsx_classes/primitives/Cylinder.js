/*
  Class that represents a cylinder primitive in the scene
*/


 function Cylinder(node,scene,id) {
 	CGFobject.call(this,scene);

  this.node = node;
  this.id = id;


  this.base = node.attributes.getNamedItem("base").value;
  this.top = node.attributes.getNamedItem("top").value;
  this.height = node.attributes.getNamedItem("height").value;

  this.slices = node.attributes.getNamedItem("slices").value;
  this.stacks = node.attributes.getNamedItem("stacks").value;
  //console.debug("Cylinder "+this.base+"\n");
 	this.initBuffers();
 };

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.initBuffers = function() {


	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();


	var ang = (2*Math.PI) / this.slices;

	var s = 0;
	var t = 0;

	for (i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), 0);
		this.normals.push(Math.cos(i*ang), Math.sin(i*ang), 0);

		this.texCoords.push(s, t);
		s += this.patchSlices;
	}


	var top = this.slices;
	var bottom = 0;

	for (k = 1; k <= this.stacks; k++) {

		s = 0;
		t += this.patchStacks;

		this.vertices.push(Math.cos(0), Math.sin(0), k/this.stacks);
		this.normals.push(Math.cos(0), Math.sin(0), 0.0);
		this.texCoords.push(s, t);

		for (i = 1; i < this.slices; i++) {

			s += this.patchSlices;

			this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), k/this.stacks);
			this.normals.push(Math.cos(i*ang), Math.sin(i*ang), 0.0);
			this.texCoords.push(s, t);

			this.indices.push(top);
			this.indices.push(bottom+1);
			this.indices.push(top+1);
			this.indices.push(bottom);
			this.indices.push(bottom+1);
			this.indices.push(top);

			top++;
			bottom++;
		}

		top++;
		bottom++;

		this.indices.push(top - 1, bottom - this.slices, top - this.slices);
		this.indices.push(bottom - 1, bottom - this.slices, top - 1);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
