/*
  Class that represents a GamePieces primitive in the scene
*/
 function GamePieces(scene,listofPieces,houses) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  this.list = [];
  //console.debug(listofPieces);
  for(var i = 0; i < 5;i++){
    for(var f = 1;f < 6;f++){
      if(listofPieces[i*5+f-1] == 'x' || listofPieces[i*5+f-1] == 'center' || listofPieces[i*5+f-1] == ''){
      }else{
        var ii = i+1;
        //console.debug(ii.toString()+f.toString());
        var house = houses.list[ii.toString()+f.toString()];
        //console.debug(house);
        this.list[ii.toString()+f.toString()] = new Array();
        for(var x = 0; x < listofPieces[i*5+f-1].length;x++){
            var type = listofPieces[i*5+f-1][x].charAt(0);
            var player = listofPieces[i*5+f-1][x].charAt(1);
            this.list[ii.toString()+f.toString()][x] = new Piece(this.scene,listofPieces[i*5+f-1][x],player,type,house,x);
        }
      }
    }
  }
 };

GamePieces.prototype = Object.create(CGFobject.prototype);
GamePieces.prototype.constructor = GamePieces;

GamePieces.prototype.update = function(Row,Col,RowDest,ColDest,listofPieces,houses){
  var Coord = Row+Col;
  //console.debug(Coord);
  var Coord2 = RowDest+ColDest;
  //console.debug(Coord2);
  this.list[Coord2].push(this.list[Coord][this.list[Coord].length-1]);
  this.list[Coord].pop();
  this.list[Coord2][this.list[Coord2].length-1].changeHouse(houses.list[Coord2],this.list);
  //console.debug(this.list[Coord2][this.list[Coord2].length-1]);
}

GamePieces.prototype.display = function(){
  for(var key in this.list){
    for(var i = 0;i < this.list[key].length;i++){
      this.scene.registerForPick(key,this.list[key][i]);
      this.list[key][i].display();
    }
  }
}
