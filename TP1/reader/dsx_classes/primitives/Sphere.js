/*
  Class that represents a Sphere primitive in the scene
*/


 function Sphere(node, scene,id) {

 	CGFobject.call(this,scene);

  this.node = node;
  this.id = id;

  this.radius = node.attributes.getNamedItem("radius").value;
  this.slices = node.attributes.getNamedItem("slices").value;
  this.stacks = node.attributes.getNamedItem("stacks").value;

  //console.debug("Sphere "+this.radius+"\n");
 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var hor_ang = (2*Math.PI) / this.slices;
	var ver_ang = (2*Math.PI) / (2*this.stacks);
	var rect = Math.PI ;

	for (i = 0; i < this.slices; i++) {
		this.vertices.push(Math.sin(rect)*Math.cos(i*hor_ang), Math.sin(rect)*Math.sin(i*hor_ang), Math.cos(rect));
		this.normals.push(Math.sin(rect)*Math.cos(i*hor_ang), Math.sin(rect)*Math.sin(i*hor_ang), Math.cos(rect));
		this.texCoords.push(0.5+0.5*Math.sin(rect)*Math.cos(i*hor_ang), 0.5*0.5*Math.sin(rect)*Math.sin(i*hor_ang));
	}

	var top = this.slices;
	var bottom = 0;

	for (k = 1; k <= this.stacks; k++) {

		this.vertices.push(Math.sin(rect - k*ver_ang)*Math.cos(0), Math.sin(rect - k*ver_ang)*Math.sin(0), Math.cos(rect - k*ver_ang));
		this.normals.push(Math.sin(rect - k*ver_ang)*Math.cos(0), Math.sin(rect - k*ver_ang)*Math.sin(0), Math.cos(rect - k*ver_ang));
		this.texCoords.push(0.5+0.5*Math.sin(rect - k*ver_ang)*Math.cos(0), 0.5+0.5*Math.sin(rect - k*ver_ang)*Math.sin(0));

		for (i = 1; i < this.slices; i++) {

			this.vertices.push(Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang), Math.cos(rect - k*ver_ang));
			this.normals.push(Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang), Math.cos(rect - k*ver_ang));
			this.texCoords.push(0.5+0.5*Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), 0.5+0.5*Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang));

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
