/*
  Class that represents a GameState in the scene
*/
 function GameState(scene) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  //Game elements
  this.HexBoard = new HexBoard(this.scene);
  this.houses = new GameHouses(this.scene);
  this.listPieces = new Array();
  var teste = makeRequest("gameinit");
  console.debug(teste.response);
  this.processBoard(teste.response);
  var teste2 = makeRequest("quit");
 };

GameState.prototype.display = function(){
  this.HexBoard.display();
  this.houses.display();
}
GameState.prototype.processBoard = function(board){
  console.debug(board.length);
  board = board.slice(1,board.length-1);
  board = board.slice(1,board.length);

  for(var linha = 0;linha <5;linha++){
    var index = 0;
    var numofpositions =0;
    while(numofpositions != 5){
      if(board.charAt(index) == '['){
        board = board.slice(1,board.length);
        board = this.readPosition(board);
        board = board.slice(1,board.length);
        numofpositions++;
      }
    }
  }

  console.debug(board);
  console.debug(this.listPieces);
}

GameState.prototype.readPosition = function(board){
  var listPosition = new Array();
  var index = 0;
  var lastindex = 0;
  while (board.charAt(index) != ']') {
    //console.debug(board.charAt(index));
    if(board.charAt(index) ==','){
      listPosition.push(board.slice(0,index));
      lastindex = index +1;
    }
    index++;
  }
  console.debug(board.slice(0,index));
  listPosition.push(board.slice(0,index));
  board = board.slice(index+1,board.length);
  this.listPieces.push(listPosition);
  return board;
}
