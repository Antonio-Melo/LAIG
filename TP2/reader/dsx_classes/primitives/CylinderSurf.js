/*
  Class that represents a cylinder primitive in the scene
*/
 function CylinderSurf(scene,id,base,top,height,slices,stacks) {
 	CGFobject.call(this,scene);

  this.id = id;

  this.base = base;
  this.top = top;
  this.height = height;
  this.slices = slices;
  this.stacks = stacks;

 	this.initBuffers();
 };

CylinderSurf.prototype = Object.create(CGFobject.prototype);
CylinderSurf.prototype.constructor = CylinderSurf;

CylinderSurf.prototype.initBuffers = function() {


	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();

  var deg2rad = Math.PI / 180.0;
  var ang = 360 / this.slices;
  var a_rad = ang * deg2rad;
  var aux = a_rad / 2;
  var razao = (this.top-this.base)/this.stacks;
  var z_norm = (this.top-this.base)/Math.sqrt((this.top-this.base)*(this.top-this.base) + this.height*this.height);

  //Normais , Vertices e TextCoords
  for(var j = 0; j < this.stacks+1; j++){
    for(var i = 0; i < this.slices+1; i++){
      this.vertices.push(Math.cos(a_rad*i)*this.base + Math.cos(a_rad*i)*(razao*j),Math.sin(a_rad*i)*this.base + Math.sin(a_rad*i)*(razao*j), (j/this.stacks)*this.height);
      this.normals.push(Math.cos(a_rad*i),Math.sin(a_rad*i),-z_norm);
      this.texCoords.push((-ang*i)/360, j/this.stacks);
    }
  }

   //Indices
   for(var j = 0; j < this.stacks; j++){
     for(var i = 0; i < this.slices; i++){
      this.indices.push(i + j*(this.slices + 1),i + j*(this.slices + 1) + 1, i + (j + 1)*(this.slices + 1) + 1);
      this.indices.push(i + j*(this.slices + 1),i + (j + 1)*(this.slices + 1) + 1, i + (j + 1)*(this.slices + 1));
     }
   }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
