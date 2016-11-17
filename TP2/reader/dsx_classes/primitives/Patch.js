function Patch(scene,id,orderU,orderV,partsU,partsV,points){

  this.scene = scene;
  this.id = id;
  this.orderU = orderU;
  this.orderV = orderV;
  this.partsU = partsU;
  this.partsV = partsV;
  this.points = points;

  CGFnurbsObject.call(this,scene);
};

Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor=Patch;
