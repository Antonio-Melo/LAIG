:- use_module(library(system)).
:- use_module(library(random)). %random
:- now(Timestamp),setrand(Timestamp).

crabPvP:-
        gameInit(0).

choosePieceToMove(Player, Board, NewBoard):-
    write('\nPlease introduce the row and collumn of the piece you want to move:'),
    write('\n    Piece Row(X) '), read(Row), Row > 0, Row =< 5,
    write('\n    Piece Collumn(Y)  '), read(Col), Col > 0, Col =< 5,
    write('\nPlease introduce the row and collumn where you want to move your piece'),
    write('\n    Piece Row(X) '), read(RowDest), Row > 0, Row =< 5,
    write('\n    Piece Collumn(Y)  '), read(ColDest), Col > 0, Col =< 5,
    (checkIsValidMove(Row, Col,RowDest,ColDest, Player, Board) ->
                    movePiece(Row,Col,RowDest,ColDest,Board,NewBoard);
                    write('\nYou have to choose an available Play!'),
                    choosePieceToMove(Player, Board, NewBoard))                                   
                ;
        write('\n Canst move that piece! Please choose one of your pieces! '),
        choosePieceToMove(Player, Board, NewBoard).
