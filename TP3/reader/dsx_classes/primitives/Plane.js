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

  var knots1 = this.getKnotsVector(1);
  var knots2 = this.getKnotsVector(1);
  var controlPoints = [];

  var halfDimX = this.dimX/2;
  var haltDimY = this.dimY/2;

  var temp = [
    [-halfDimX,-haltDimY,0,1],
    [-halfDimX,haltDimY,0,1]
  ];
  var temp1 = [
    [halfDimX,-haltDimY,0,1],
    [halfDimX,haltDimY,0,1]
  ];
  controlPoints.push(temp);
  controlPoints.push(temp1);

  var surface = new CGFnurbsSurface(1,1,knots1,knots2,controlPoints);
  getSurfacePoint = function(u,v){
    return surface.getPoint(u,v);
  };

  CGFnurbsObject.call(this,scene,getSurfacePoint,this.partsX,this.partsY);

};

Plane.prototype = Object.create(CGFnurbsObject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.getKnotsVector = function (degree) {
 var vector = [];

 for(var i = 0; i <= degree;i++){
   vector.push(0);
 }
 for(var i = 0; i <= degree;i++){
   vector.push(1);
 }

 return vector;
};
