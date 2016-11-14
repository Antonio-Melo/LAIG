function Plane(node,scene, id){

  CGFobject.call(this,scene);
  this.scene = scene;
  this.node = node;
  this.id = id;

  this.dimX = node.attributes.getNamedItem("dimX").value;
  this.dimY = node.attributes.getNamedItem("dimY").value;
  this.partsX = node.attributes.getNamedItem("partsX").value;
  this.partsY = node.attributes.getNamedItem("partsY").value;

  this.initBuffers();
};

Plane.prototype = Object.creat(CFGobject.prototype);
Plane.prototype.constructor = Plane;


Plane.prototype.getKnotsVector = function(degree) {

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
};

Plane.prototype.makeSurface = function (degree1, degree2, controlvertexes) {

  var controlPoints = [];
  var tempX = this.dimX / 2;
  var tempY = this.dimY / 2;

  var controlPointTemp = [[tempX, -tempY, 0, 1],
                          [tempX,  tempY, 0, 1]];
  controlPoints.push(temp);


  var controlPointTemp = [[-tempX, -tempY, 0, 1],
                          [-tempX,  tempY, 0, 1]];
  controlPoints.push(temp);

 this.surface = this.makeSurface(1,1,controlPoints);

	var knots1 = this.getKnotsVector(degree1);
	var knots2 = this.getKnotsVector(degree2);

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = CGFnurbsObject(this.scene, getSurfacePoint, this.partsX, this.partsY);
};

Plane.prototype.initBuffers = function(){
  this.surface.initBuffers();
};

Plane.prototype.display = function(){

  this.surface.display();
};
