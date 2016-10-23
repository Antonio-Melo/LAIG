/*
  Class that represents a triangle primitive in the scene
*/



function Triangle(node,scene,id) {

  CGFobject.call(this,scene);

	this.materialDefault = new CGFappearance(this.scene);

  this.node = node;
  this.id = id;

  this.x1 = node.attributes.getNamedItem("x1").value;
  this.x2 = node.attributes.getNamedItem("x2").value;
  this.x3 = node.attributes.getNamedItem("x3").value;

  this.y1 = node.attributes.getNamedItem("y1").value;
  this.y2 = node.attributes.getNamedItem("y2").value;
  this.y3 = node.attributes.getNamedItem("y3").value;


  this.z1 = node.attributes.getNamedItem("z1").value;
  this.z2 = node.attributes.getNamedItem("z2").value;
  this.z3 = node.attributes.getNamedItem("z3").value;

  this.p1 = [this.x1,this.y1,this.z1];
  this.p2 = [this.x2,this.y2,this.z2];
  this.p3 = [this.x3,this.y3,this.z3];

  //console.debug("Triangle "+this.x1);

	this.initBuffers();

};
Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor=Triangle;

Triangle.prototype.initBuffers = function () {
	this.vertices = [
            this.x1, this.y1, this.z1,
            this.x2, this.y2, this.z2,
            this.x3, this.y3, this.z3
			];

	this.indices = [0, 1, 2];

  this.normals = [
    0,0,1,
    0,0,1,
    0,0,1,
  ];

  this.primitiveType=this.scene.gl.TRIANGLES;

  var base = this.vecProperties(this.makeVec(this.p3,this.p2),this.makeVec(this.p3,this.p1));

  this.baseTexCoor = [
    base[0] - base[1] * Math.cos(base[2]),base[1] * Math.sin(base[2]),
    0,1,
    base[0],1
  ];

  this.texCoords = [
    base[0]-base[1] *Math.cos(base[2]),1-base[1]*Math.sin(base[2]),
    0,1,
    base[0],1
  ];

	this.initGLBuffers();
};

Triangle.prototype.makeVec = function(p1, p2) {
  return [p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]];
}

Triangle.prototype.calLength = function(vec){
  return Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]+vec[2]*vec[2]);
}

Triangle.prototype.multVec = function(p1,p2){
  return (p1[0] * p2[0]) + (p1[1] * p2[1]) + (p1[2] * p2[2]);
}

Triangle.prototype.vecProperties =function(v1,v2){
  var l1 = this.calLength(v1);
  var l2 = this.calLength(v2);
  var mult =this.multVec(v1,v2);
  var ang = Math.acos(mult/(l1*l2));

  return [l1,l2,ang];
}

Triangle.prototype.setTexCoords = function(ls,lt){
  this.texCoords = [
    this.baseTexCoor[0]/ls,1-(this.baseTexCoor[1]/lt),
    0,1,
    this.baseTexCoor[4]/ls,1
  ];

  this.updateTexCoordsGLBuffers();
}
