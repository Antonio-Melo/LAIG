function Patch(scene,id,orderU,orderV,partsU,partsV,controlPoints){

  this.scene = scene;
  this.id = id;
  this.orderU = orderU;
  this.orderV = orderV;
  this.partsU = partsU;
  this.partsV = partsV;
  this.controlPoints = controlPoints;

  var knots1 = this.getKnotsVector(this.orderU);
  var knots2 = this.getKnotsVector(this.orderV);

  var pointsVec = [];
  for(var x = 0; x <= this.orderU;x++){
    var vecU = [];
    for(var i = 0; i <= this.orderV; i++){
      var p = controlPoints[i+(this.orderV+1)*x];
      vecU.push([p[0],p[1],p[2],1]);
    }
    pointsVec.push(vecU);
  }

  var surface = new CGFnurbsSurface(this.orderU,this.orderV,knots1,knots2,pointsVec);
  getSurfacePoint = function(u, v) {
    return surface.getPoint(u, v);
  };
  CGFnurbsObject.call(this,scene,getSurfacePoint,this.partsU,this.partsV);
};

Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor=Patch;


Patch.prototype.getKnotsVector = function (degree) {
 var vector = [];

 for(var i = 0; i <= degree;i++){
   vector.push(0);
 }
 for(var i = 0; i <= degree;i++){
   vector.push(1);
 }

 return vector;
};
