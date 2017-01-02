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
  this.listBoardProlog = teste.response;
  //console.debug(teste.response);
  this.processBoard(teste.response);
  this.pieces = new GamePieces(this.scene,this.listPieces,this.houses);
  this.checkIsValidMove("2","3","3","4","1");
  this.requestMove("2","3","3","4","1");
  var teste2 = makeRequest("quit");
 };

GameState.prototype.display = function(){
  this.HexBoard.display();
  this.houses.display();
  this.pieces.display();
}

GameState.prototype.checkIsValidMove = function(Row,Col,RowDest,ColDest,Player){
  var RequestType = 1;
  var Coords = "["+RequestType+","+Row+","+Col+","+RowDest+","+ColDest+","+Player+",";
  var Message = Coords + this.listBoardProlog+"]";
  console.debug(Message);
  var Response = makeRequest(Message);
  console.debug(Response.response);
}
GameState.prototype.requestMove = function(Row,Col,RowDest,ColDest,Player){
  var RequestType = 0;
  var Coords = "["+RequestType+","+Row+","+Col+","+RowDest+","+ColDest+","+Player+",";
  var Message = Coords + this.listBoardProlog+"]";
  console.debug(Message);
  var Response = makeRequest(Message);
  this.listBoardProlog = Response.response;
  this.processBoard(this.listBoardProlog);
  this.pieces.update(this.listPieces,this.houses);
  console.debug(Response.response);
}
GameState.prototype.processBoard = function(board){
  this.listPieces = [];
  board = board.slice(1,board.length-1);
  //console.debug(board);

  for(var linha = 0;linha <5;linha++){
    board = board.slice(1,board.length);
    if(linha !=0)
      board = board.slice(1,board.length);
    //console.debug(board);
    var index = 0;
    var numofpositions =0;
    while(numofpositions != 5){
      if(board.charAt(index) == '['){
        board = board.slice(1,board.length);
        //console.debug(board);
        board = this.readPosition(board);
        //console.debug(board);
        board = board.slice(1,board.length);
        //console.debug(board);
        numofpositions++;
      }
    }
  }

  //console.debug(board);
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
  //console.debug(board.slice(0,index));
  listPosition.push(board.slice(0,index));
  board = board.slice(index+1,board.length);
  this.listPieces.push(listPosition);
  return board;
}
