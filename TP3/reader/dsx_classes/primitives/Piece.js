/*
  Class that represents a Piece primitive in the scene
*/
 function Piece(scene,id,player,type,house,y) {
 	CGFobject.call(this,scene);

  this.id = id;
  this.type = type;
  this.player = player;
  this.house = house;
  this.y = y;
  var ptexture;
  var ttexture;
  if(this.player == "1")  ptexture = "blue";
  else ptexture = "red";
  switch (this.type) {
    case "s":
      ttexture = "3";
      break;
    case "m":
      ttexture = "2";
      break;
    case "l":
      ttexture = "1";
      break;
    default:
      break;
  }
  //console.debug(ptexture);
  //console.debug(ttexture);

  this.surface = new CylinderSurf(scene,this.id,2.5,2.5,1,40,40);
  this.topCir = new CylinderBase(scene,2.5,40);
  this.baseCir = new CylinderBase(scene,2.5,40);
  this.basecolor = new CGFappearance(scene);
  this.basecolor.loadTexture("textures\\"+ptexture+".png");
  this.topcolor = new CGFappearance(scene);
  this.topcolor.loadTexture("textures\\"+ptexture+ttexture+".png");
 };

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function(){
  this.basecolor.apply();
  this.scene.pushMatrix();
    this.scene.translate(this.house.x,this.y,this.house.z);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.surface.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.translate(this.house.x,this.y,this.house.z);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI,0,1,0);
    this.baseCir.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.topcolor.apply();
    this.scene.translate(this.house.x,this.y,this.house.z);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.translate(0,0,1);
    this.topCir.display();
  this.scene.popMatrix();
}
