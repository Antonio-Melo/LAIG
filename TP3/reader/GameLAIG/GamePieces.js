/*
  Class that represents a GamePieces primitive in the scene
*/
 function GamePieces(scene) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  this.list = new Array();

 };

GamePieces.prototype = Object.create(CGFobject.prototype);
GamePieces.prototype.constructor = GamePieces;

GamePieces.prototype.display = function(){
  /*for(var key in this.list){
    this.scene.registerForPick(key,this.list[key]);
    this.list[key].display();
  }*/
}
