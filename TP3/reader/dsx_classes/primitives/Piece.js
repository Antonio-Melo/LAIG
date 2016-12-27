/*
  Class that represents a Piece primitive in the scene
*/
 function Piece(scene,id,player,type) {
 	CGFobject.call(this,scene);

  this.id = id;
  this.type = type;
  this.player = player;

  this.surface = new CylinderSurf(scene,this.id,2.5,2.5,1,40,40);
  this.topCir = new CylinderBase(scene,2.5,40);
  this.baseCir = new CylinderBase(scene,2.5,40);
  this.basecolor = new CGFappearance(scene);
  this.basecolor.loadTexture("textures\\"+this.player+".png");
  this.topcolor = new CGFappearance(scene);
  this.topcolor.loadTexture("textures\\"+this.player+this.type+".png");
 };

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function(){
  this.basecolor.apply();
  this.scene.pushMatrix();
  this.scene.rotate(-Math.PI/2,1,0,0);
    this.surface.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI,0,1,0);
    this.baseCir.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.topcolor.apply();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.translate(0,0,1);
    this.topCir.display();
  this.scene.popMatrix();
}
