%%Cada Caranguejo tem um determinado tamanho e determinada cor consoante o seu jogador

%crab(Color,Size,NumMoves).

%isCrab(crab(+Color,+Size,+NumMoves)).
isCrab(crab(_,_,_)).

%Getters

%getColor(crab(+color,+size,+numMoves),-color).
getColor(crab(Color,_,_),Color).

%getSize(crab(+color,+size,+numMoves),-size).
getSize(crab(_,Size,_),Size).

%getNumMoves(crab(+color,+size,+numMoves),-numMoves).
getNumMoves(crab(_,_,NumMoves),NumMoves).

%Setters

%setColor(crab(+color,+size,+numMoves),+Color,crab(-color,-size,-numMoves)).
setColor(crab(_,Size,NumMoves),NewColor,crab(NewColor,Size,NumMoves)).

%setSize(crab(+color,+size,numMoves),+size,crab(-color,size,-numMoves)).
setSize(crab(Color,_,NumMoves),NewSize,crab(Color,NewSize,NumMoves)).

%setNumMoves(crab(+color,+size,numMoves),+numMoves,crab(-color,size,-numMoves)).
setNumMoves(crab(Color,Size,_),NewNumMoves,crab(Color,Size,NewNumMoves)).