/*
  Class that represents a Piece primitive in the scene
*/
 function Piece(scene,id) {
 	CGFobject.call(this,scene);

  this.id = id;

  this.surface = new CylinderSurf(scene,this.id,2,2,1,40,40);
  this.topCir = new CylinderBase(scene,2,40);
  this.baseCir = new CylinderBase(scene,2,40);
 };

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function(){
  this.surface.display();

  this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    this.baseCir.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0,0,1);
    this.topCir.display();
  this.scene.popMatrix();
}
