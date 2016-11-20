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
