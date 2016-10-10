/*
  Class that represents a triangle primitive in the scene
*/



function Triangle(node,scene) {

  CGFobject.call(this,scene);

	this.materialDefault = new CGFappearance(this.scene);

  this.node = node;

  this.x1 = node.attributes.getNamedItem("x1").value;
  this.x2 = node.attributes.getNamedItem("x2").value;
  this.x3 = node.attributes.getNamedItem("x3").value;

  this.y1 = node.attributes.getNamedItem("y1").value;
  this.y2 = node.attributes.getNamedItem("y2").value;
  this.y3 = node.attributes.getNamedItem("y3").value;

  this.z1 = node.attributes.getNamedItem("z1").value;
  this.z2 = node.attributes.getNamedItem("z2").value;
  this.z3 = node.attributes.getNamedItem("z3").value;

  console.debug("Triangle "+this.x1);

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

	this.indices = [
            0, 1, 2
        ];

    this.normals = [
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
    ];

  this.texCoords = [
    this.x1, this.y2,
    this.x2, this.y2,
    this.x1, this.y1,
   	this.x2, this.y1
  ];

  this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
