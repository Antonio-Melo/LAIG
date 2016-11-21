/*
  Class that represents a cylinder primitive in the scene
*/
 function Cylinder(scene,id,base,top,height,slices,stacks) {
 	CGFobject.call(this,scene);

  this.id = id;

  this.base = base;
  this.top = top;
  this.height = height;
  this.slices = slices;
  this.stacks = stacks;

  this.surface = new CylinderSurf(scene,this.id,this.base,this.top,this.height,this.slices,this.stacks);
  this.topCir = new CylinderBase(scene,this.top,this.slices);
  this.baseCir = new CylinderBase(scene,this.base,this.slices);
 };

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.display = function(){
  this.surface.display();

  this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    this.baseCir.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0,0,this.height);
    this.topCir.display();
  this.scene.popMatrix();
}
