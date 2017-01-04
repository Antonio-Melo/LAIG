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
  var GameInit = makeRequest("gameinit");
  this.listBoardProlog = GameInit.response;
  //console.debug(teste.response);
  this.processBoard(GameInit.response);
  this.pieces = new GamePieces(this.scene,this.listPieces,this.houses);
  /*
  //Teste
  //Animação de uma peça
  var PieceTeste = this.pieces.list["24"];
  var HouseOrigin = PieceTeste[0].house;
  var HouseDest = this.houses.list["25"];
  console.debug(PieceTeste);
  console.debug(HouseOrigin);
  console.debug(HouseDest);

  //Calculate points
  var firstPoint = [HouseOrigin.x,this.pieces.list["24"].length-1,HouseOrigin.z];
  var middlePoint = [9.25,2,HouseDest.z];
  var lastPoint = [HouseDest.x,this.pieces.list["25"].length,HouseDest.z];
  var points = [firstPoint,middlePoint,lastPoint];
  console.debug(points);
  //CreatingAnimation
  this.animation = new LinearAnimation("teste",2,points);
  console.debug(this.animation);
  PieceTeste[0].animate(this.animation);*/
  this.animation = null;

  //var teste2 = makeRequest("quit");

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
    console.debug("Red player wins");
    this.closeServer();
  }
  if(redScore == "9"){
    console.debug("Blue player wins");
    this.closeServer();
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
        //console.debug("Vou fazer request");
        console.debug(this.PickedPiece);
        var Piece = this.pieces.list[this.PickedPiece][this.pieces.list[this.PickedPiece].length-1];
        console.debug(Piece);
        var HouseOrigin = Piece.house;
        console.debug(HouseOrigin);
        var HouseDest = this.houses.list[id];
        console.debug(HouseDest);
        var points = this.calculatePoints(Piece,HouseOrigin,HouseDest,id);
        //CreatingAnimation
        this.animation = new LinearAnimation("teste",1,points);
        console.debug(this.animation);
        Piece.animate(this.animation);
        console.debug(Piece);

        this.requestMove(Row,Col,RowDest,ColDest,this.PlayerinGame);

        this.requestLockedPieces();
        if(this.PlayerinGame == "1"){
          this.PlayerinGame = "2";
        }else this.PlayerinGame = "1";
      }
    }
    this.PickedPiece = null;
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
  console.debug(points)
  return points;
}
GameState.prototype.checkIsValidMove = function(Row,Col,RowDest,ColDest,Player){
  var RequestType = 1;
  var Coords = "["+RequestType+","+Row+","+Col+","+RowDest+","+ColDest+","+Player+",";
  var Message = Coords + this.listBoardProlog+"]";
  //console.debug(Message);
  var Response = makeRequest(Message);
  //console.debug(Response.response);
  return Response.response;
}
GameState.prototype.requestMove = function(Row,Col,RowDest,ColDest,Player){
  var RequestType = 0;
  var Coords = "["+RequestType+","+Row+","+Col+","+RowDest+","+ColDest+","+Player+",";
  var Message = Coords + this.listBoardProlog+"]";
  //console.debug(Message);
  var Response = makeRequest(Message);
  this.listBoardProlog = Response.response;
  this.processBoard(this.listBoardProlog);
  this.pieces.update(Row,Col,RowDest,ColDest,this.listPieces,this.houses);
  //console.debug(Response.response);
}

GameState.prototype.requestLockedPieces = function(){
  var Response = makeRequest("locked");
  //console.debug(Response.response);
  this.checkWin(Response.response);
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
  //console.debug(this.listPieces);
}

GameState.prototype.readPosition = function(board){
  var listPosition = new Array();
  var index = 0;
  var lastindex = 0;
  while (board.charAt(index) != ']') {
    //console.debug(board.charAt(index));
    if(board.charAt(index) ==','){
      listPosition.push(board.slice(lastindex,index));
      lastindex = index +1;
    }
    index++;
  }
  //console.debug(board.slice(0,index));
  listPosition.push(board.slice(lastindex,index));
  board = board.slice(index+1,board.length);
  this.listPieces.push(listPosition);
  return board;
}
