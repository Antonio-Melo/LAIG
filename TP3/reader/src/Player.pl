%player(+number,+numPieces).


%isPlayer(player(+number,+numPieces)).
isPlayer(player(_,_)).

%Getters

%getNumber(player(+number,+numPieces),-number).
getNumber(player(Number,_),Number).

%getNumPieces(player(+number,+numPieces),-numPieces).
getNumPieces(player(_,NumPieces),NumPieces).

%Setters

%setNumber(player(+number,+numPieces),+number,player(-number,-numPieces,)).
setNumber(player(_,NumPieces),NewNumber,player(NewNumber,NumPieces)).

%setNumPieces(player(+number,+numPieces),+numPieces,player(-number,-numPieces,)).
setNumPieces(player(Number,_),NewNumPieces,player(Number,NewNumPieces)).

%decCrabPieces(player(+number,+numPieces),player(-number,-numPieces)).
decCrabPieces(player(Number,NumPieces),player(Number,NewNumberPieces)):-
        NewNumberPieces is NumPieces - 1.

