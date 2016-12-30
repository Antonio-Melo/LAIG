/*
  Class that represents a GamePieces primitive in the scene
*/
 function GamePieces(scene,listofPieces,houses) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  this.list = new Array();

  for(var i = 1; i < 6;i++){
    for(var f = 1;f < 6;f++){
      if(listofPieces[(i*f)-1] == 'x' ||listofPieces[(i*f)-1] == 'center'){
      }else{
        var type = listofPieces[(i*f)-1][0].charAt(0);
        var player = listofPieces[(i*f)-1][0].charAt(1);
        console.debug(i.toString()+f.toString());
        var house = houses.list[i.toString()+f.toString()];
        this.list[listofPieces[(i*f)-1][0]] = new Piece(this.scene,listofPieces[(i*f)-1][0],player,type,house);
      }
    }
  }
 };

GamePieces.prototype = Object.create(CGFobject.prototype);
GamePieces.prototype.constructor = GamePieces;

GamePieces.prototype.display = function(){
  for(var key in this.list){
    this.scene.registerForPick(key,this.list[key]);
    this.list[key].display();
  }
}
