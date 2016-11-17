/**
 * Plane
 * @constructor
 */
function Plane(scene,id,dimX,dimY,partsX,partsY){

  this.scene = scene;
  this.id = id;
  this.dimX = dimX;
  this.dimY = dimY;
  this.partsX = partsX;
  this.partsY = partsY;

  CGFnurbsObject.call(this,scene);
};

Plane.prototype = Object.create(CGFnurbsObject.prototype);
Plane.prototype.constructor = Plane;

/*
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

  var knots1 = this.getKnotsVector(degree1);
	var knots2 = this.getKnotsVector(degree2);

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = CGFnurbsObject(this.scene, getSurfacePoint, this.partsX, this.partsY);
};

Plane.prototype.initBuffers = function(){
  var controlPoints = [];
  var tempX = this.dimX / 2;
  var tempY = this.dimY / 2;

  var controlPointTemp = [[tempX, -tempY, 0, 1],
                          [tempX,  tempY, 0, 1]];
  controlPoints.push(controlPointTemp);


  var controlPointTemp = [[-tempX, -tempY, 0, 1],
                          [-tempX,  tempY, 0, 1]];
  controlPoints.push(controlPointTemp);

  this.plane = this.makeSurface(1,1,controlPoints);
};

Plane.prototype.display = function(){

  this.plane.display();
};*/
