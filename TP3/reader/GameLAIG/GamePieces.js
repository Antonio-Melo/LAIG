/*
  Class that represents a GamePieces primitive in the scene
*/
 function GamePieces(scene,listofPieces,houses) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  this.list = new Array();

  for(var i = 0; i < 5;i++){
    for(var f = 1;f < 6;f++){
      if(listofPieces[i*5+f-1] == 'x' || listofPieces[i*5+f-1] == 'center'){
      }else{
        var type = listofPieces[i*5+f-1][0].charAt(0);
        var player = listofPieces[i*5+f-1][0].charAt(1);
        var ii = i+1;
        console.debug(ii.toString()+f.toString());
        var house = houses.list[ii.toString()+f.toString()];
        console.debug(house);
        this.list[ii.toString()+f.toString()] = new Array();
        this.list[ii.toString()+f.toString()][0] = new Piece(this.scene,listofPieces[i*5+f-1][0],player,type,house);
      }
    }
  }
 };

GamePieces.prototype = Object.create(CGFobject.prototype);
GamePieces.prototype.constructor = GamePieces;

GamePieces.prototype.display = function(){
  for(var key in this.list){
    for(var i = 0;i < this.list[key].length;i++){
      this.scene.registerForPick(key,this.list[key][i]);
      this.list[key][i].display();
    }
  }
}
