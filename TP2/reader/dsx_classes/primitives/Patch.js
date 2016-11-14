function Patch(scene,orderU,orderV,partsU,partsV,controlPoints){

  CGFobject.call(this,scene);
  this.scene = scene;
  this.orderU = orderU;
  this.orderV = orderV;
  this.partsU = partsU;
  this.partsV = partsV;
  this.controlpoints = controlPoints;
  this.initBuffers();

};

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor=Patch;
