/*
  Class that represents a GameState in the scene
*/
 function GameState(scene) {
 	CGFobject.call(this,scene);

  this.scene = scene;

  //Game elements
  this.PlayerinGame = "1";
  this.PickedPiece = null;
  this.HexBoard = new HexBoard(this.scene);
  this.houses = new GameHouses(this.scene);
  this.listPieces = new Array();
  this.moves = [];

  //Starting the Game
  var GameInit = makeRequest("gameinit");
  this.listBoardProlog = GameInit.response;
  this.processBoard(GameInit.response);

  //Creating Pieces
  this.pieces = new GamePieces(this.scene,this.listPieces,this.houses);
  this.animation = null;

  //makeRequest("quit");
 };

GameState.prototype.display = function(){
  this.HexBoard.display();
  this.houses.display();
  this.pieces.display();
}
GameState.prototype.checkWin = function(scores){
  var blueScore = scores.charAt(1);
  var redScore = scores.charAt(3);
  if(blueScore == "9"){
    this.closeServer();
    document.getElementById("wintext").innerHTML = "Player 2 wins !!";
    document.getElementById("wintext").style.display = "inline";
  }
  if(redScore == "9"){
    this.closeServer();
    document.getElementById("wintext").innerHTML = "Player 1 wins !!";
    document.getElementById("wintext").style.display = "inline";
  }

}

GameState.prototype.closeServer = function(){
  makeRequest("quit");
}
GameState.prototype.processPick = function(id){
  console.debug(this.PickedPiece);
  if(this.PickedPiece == null){
    console.debug("Não tinha nenhum");
    var Row = id[0];
    var Col = id[1];
    if(!(Row == "3" && Col == "3")){
      if(this.pieces.list[id].length != 0){
        this.PickedPiece = id;
      }
    }
  }else{
    console.debug(this.PlayerinGame);
    console.debug("Já tinha");
    var Row = this.PickedPiece[0];
    var Col = this.PickedPiece[1];
    var RowDest = id[0];
    var ColDest = id[1];
    if(!(RowDest == "3" && ColDest == "3")){
      if(this.checkIsValidMove(Row,Col,RowDest,ColDest,this.PlayerinGame) == "[1]"){
        //Save move
        var move =[Row,Col,RowDest,ColDest,this.listBoardProlog.slice()];
        this.moves.push(move);


        //console.debug("Vou fazer request");
        console.debug(this.PickedPiece);
        var Piece = this.pieces.list[this.PickedPiece][this.pieces.list[this.PickedPiece].length-1];
        console.debug(Piece);
        var HouseOrigin = Piece.house;
        var HouseDest = this.houses.list[id];
        var points = this.calculatePoints(Piece,HouseOrigin,HouseDest,id);
        //CreatingAnimation
        this.animation = new LinearAnimation("teste",1,points);
        Piece.animate(this.animation);

        this.requestMove(Row,Col,RowDest,ColDest,this.PlayerinGame);
        this.requestLockedPieces();
        if(this.PlayerinGame == "1"){
          this.PlayerinGame = "2";
          this.changeBackgroundColorPlayer(1);
        }else{
           this.PlayerinGame = "1";
           this.changeBackgroundColorPlayer(2);
        }
        this.scene.timepassed = new Date();
      }
    }
    this.PickedPiece = null;
  }
}

GameState.prototype.undo = function(){
  var lastmove = this.moves[this.moves.length-1];
  this.pieces.undo(lastmove[0],lastmove[1],lastmove[2],lastmove[3],this.listPieces,this.houses);
  this.moves.pop();
  this.listBoardProlog = lastmove[4];
  this.processBoard(this.listBoardProlog);
  if(this.PlayerinGame == "1") makeRequest("unlockPiece1");
  else makeRequest("unlockPiece2");
  this.requestLockedPieces();
  if(this.PlayerinGame == "1"){
    this.PlayerinGame = "2";
    this.changeBackgroundColorPlayer(1);
  }else{
     this.PlayerinGame = "1";
     this.changeBackgroundColorPlayer(2);
  }
}
GameState.prototype.calculatePoints = function(Piece,HouseOrigin,HouseDest,id){
  var firstPoint = [HouseOrigin.x,this.pieces.list[HouseOrigin.id].length-1,HouseOrigin.z];
  if(this.pieces.list[HouseOrigin.id].length-1 >= this.pieces.list[HouseDest.id].length)
    var middlePoint = [(HouseDest.x+HouseOrigin.x)/2,this.pieces.list[HouseOrigin.id].length+1,(HouseOrigin.z+HouseDest.z)/2];
  else
    var middlePoint = [(HouseDest.x+HouseOrigin.x)/2,this.pieces.list[HouseDest.id].length+1,(HouseOrigin.z+HouseDest.z)/2];
  var lastPoint = [HouseDest.x,this.pieces.list[HouseDest.id].length,HouseDest.z];
  var points = [firstPoint,middlePoint,lastPoint];

  return points;
}
GameState.prototype.checkIsValidMove = function(Row,Col,RowDest,ColDest,Player){
  var RequestType = 1;
  var Coords = "["+RequestType+","+Row+","+Col+","+RowDest+","+ColDest+","+Player+",";
  var Message = Coords + this.listBoardProlog+"]";
  var Response = makeRequest(Message);

  return Response.response;
}
GameState.prototype.requestMove = function(Row,Col,RowDest,ColDest,Player){
  var RequestType = 0;
  var Coords = "["+RequestType+","+Row+","+Col+","+RowDest+","+ColDest+","+Player+",";
  var Message = Coords + this.listBoardProlog+"]";
  var Response = makeRequest(Message);

  this.listBoardProlog = Response.response;
  this.processBoard(this.listBoardProlog);
  this.pieces.update(Row,Col,RowDest,ColDest,this.listPieces,this.houses);
}

GameState.prototype.requestLockedPieces = function(){
  var Response = makeRequest("locked");
  document.getElementById("player-blue-score").innerHTML = Response.response[1];
  document.getElementById("player-red-score").innerHTML = Response.response[3];
  this.checkWin(Response.response);
}

GameState.prototype.processBoard = function(board){
  this.listPieces = [];
  board = board.slice(1,board.length-1);

  for(var linha = 0;linha <5;linha++){
    board = board.slice(1,board.length);
    if(linha !=0)
      board = board.slice(1,board.length);
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

}
GameState.prototype.changeBackgroundColorPlayer = function(n){
  if(n == 1){
    document.getElementById("player-blue").style.backgroundColor = "#CCCCCC";
    document.getElementById("player-red").style.backgroundColor = "black";
  }else{
    document.getElementById("player-red").style.backgroundColor = "#CCCCCC";
    document.getElementById("player-blue").style.backgroundColor = "black";
  }

}
GameState.prototype.readPosition = function(board){
  var listPosition = new Array();
  var index = 0;
  var lastindex = 0;
  while (board.charAt(index) != ']') {
    if(board.charAt(index) ==','){
      listPosition.push(board.slice(lastindex,index));
      lastindex = index +1;
    }
    index++;
  }
  listPosition.push(board.slice(lastindex,index));
  board = board.slice(index+1,board.length);
  this.listPieces.push(listPosition);
  return board;
}
