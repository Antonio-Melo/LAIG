%Includes
:-include('utils.pl'). %Utils

%LIBRARIES
:- use_module(library(lists)). %lists
:- use_module(library(random)). %random

:-dynamic lockedPieces/2.
lockedPieces(1,0).
lockedPieces(2,0).

gameState(board,lockedPieces,turnToPlay).

%Game Initializer 
gameInit(0):-
        retract(lockedPieces(1, _)),
        assert(lockedPieces(1, 0)),
        retract(lockedPieces(2, _)),
        assert(lockedPieces(2, 0)),
        board(T),
        write('Placing Player1 Pieces\n'),   
        positionPlayerPieces(1,T,NewBoard),
        write('Placing Player2 Pieces\n'), 
        positionPlayerPieces(2,NewBoard,NewBoard2),
        write('Displaying Initial Board\n'),
        display_tab(NewBoard2),
        game_loop(1,NewBoard2).
gameInit(1):-
        retract(lockedPieces(1, _)),
        assert(lockedPieces(1, 0)),
        retract(lockedPieces(2, _)),
        assert(lockedPieces(2, 0)),
        board(T),
        write('Placing Player1 Pieces\n'),   
        positionPlayerPieces(1,T,NewBoard),
        write('Placing Bot Pieces\n'), 
        positionPlayerPieces(2,NewBoard,NewBoard2),
        write('Displaying Initial Board\n'),
        display_tab(NewBoard2),
        game_loop(0,NewBoard2).


%Game loops

game_loop(1, Board):-  % Play 1 turn
        write('Player1 turn !\n'),
        choosePieceToMove(1,Board,NewBoard),
        display_tab(NewBoard),
        lockedPieces(2, CheckWin),
        write(CheckWin),
        write('piece(s) locked from Player 2\n'),
        ((CheckWin == 9)->write('Player1 wins');game_loop(2,NewBoard)).
game_loop(2, Board):-  % Play 2 turn
        write('Player2 turn !\n'),
        choosePieceToMove(2,Board,NewBoard),
        display_tab(NewBoard),
        lockedPieces(1, CheckWin),
        write(CheckWin),
        write('piece(s) locked from Player 1\n'),
        ((CheckWin == 9)->write('Player2 wins');game_loop(1,NewBoard)).
game_loop(0,Board):- %Bot turn
        write('Bot turn !\n'),
        chooseBestPlay(2,Board,1,1,0,Xmove,Ymove,Xsource,Ysource),
        movePiece(Xsource,Ysource,Xmove,Ymove,Board,NewBoard),
        display_tab(NewBoard),
        lockedPieces(1, CheckWin),
        write(CheckWin),
        write('piece(s) locked from Player 1\n'),
       ((CheckWin == 9)->write('Player1 wins');game_loop(1,NewBoard)).

%---------------------------BOT----------------------------------- %
%------Chooses best Bot play------%
%Chamar chooseBestPiecePlay
%Receber do chooseBestPiecePlay a melhor jogada comparar e guardar no predicado a melhor das duas(no fim vamos ter a melhor)

%---Inside Positions---%
%Player 2 Pieces
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,s2),
        Xquad0 is X-3,
        Yquad0 is Y-3,
        Xquad1 is X+3,
        Yquad1 is Y+3,
        BestPlayP is 0,
        chooseBestPiecePlay(X,Y,Xquad0,Yquad0,Xquad1,Yquad1,Xquad0,Yquad0,Xquad1,Yquad1,Board,BestPlayP,0,XmoveP,YmoveP),
        Y1 is Y+1,
        ((BestPlayP > BestPlay)->chooseBestPlay(2,Board,X,Y1,BestPlayP,XmoveP,YmoveP,X,Y);chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource)).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,m2),
        Xquad0 is X-2,
        Yquad0 is Y-2,
        Xquad1 is X+2,
        Yquad1 is Y+2,
        BestPlayP is 0,
        chooseBestPiecePlay(X,Y,Xquad0,Yquad0,Xquad1,Yquad1,Xquad0,Yquad0,Xquad1,Yquad1,Board,BestPlayP,0,XmoveP,YmoveP),
        Y1 is Y+1,
        ((BestPlayP > BestPlay)->chooseBestPlay(2,Board,X,Y1,BestPlayP,XmoveP,YmoveP,X,Y);chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource)).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,l2),
        Xquad0 is X-1,
        Yquad0 is Y-1,
        Xquad1 is X+1,
        Yquad1 is Y+1,
        BestPlayP is 0,
        chooseBestPiecePlay(X,Y,Xquad0,Yquad0,Xquad1,Yquad1,Xquad0,Yquad0,Xquad1,Yquad1,Board,BestPlayP,0,XmoveP,YmoveP),
        Y1 is Y+1,
        ((BestPlayP > BestPlay)->chooseBestPlay(2,Board,X,Y1,BestPlayP,XmoveP,YmoveP,X,Y);chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource)).
%Player 1 Pieces
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,s1),
        Y1 is Y+1,
        chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,m1),
        Y1 is Y+1,
        chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,l1),
        Y1 is Y+1,
        chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,x),
        Y1 is Y+1,
        chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <6,Y> 0, Y <5,
        getCell(X,Y,Board,C),
        last(C,center),
        Y1 is Y+1,
        chooseBestPlay(2,Board,X,Y1,BestPlay,Xmove,Ymove,Xsource,Ysource).
%---Last Column---%
%Player 2 Pieces 
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,s2),
        Xquad0 is X-3,
        Yquad0 is Y-3,
        Xquad1 is X+3,
        Yquad1 is Y+3,
        BestPlayP is 0,
        chooseBestPiecePlay(X,Y,Xquad0,Yquad0,Xquad1,Yquad1,Xquad0,Yquad0,Xquad1,Yquad1,Board,BestPlayP,0,XmoveP,YmoveP),
        X1 is X+1,
        ((BestPlayP > BestPlay)->chooseBestPlay(2,Board,X1,1,BestPlayP,XmoveP,YmoveP,X,Y);chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource)).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,m2),
        Xquad0 is X-2,
        Yquad0 is Y-2,
        Xquad1 is X+2,
        Yquad1 is Y+2,
        BestPlayP is 0,
        chooseBestPiecePlay(X,Y,Xquad0,Yquad0,Xquad1,Yquad1,Xquad0,Yquad0,Xquad1,Yquad1,Board,BestPlayP,0,XmoveP,YmoveP),
        X1 is X+1,
        ((BestPlayP > BestPlay)->chooseBestPlay(2,Board,X1,1,BestPlayP,XmoveP,YmoveP,X,Y);chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource)).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,l2),
        Xquad0 is X-1,
        Yquad0 is Y-1,
        Xquad1 is X+1,
        Yquad1 is Y+1,
        BestPlayP is 0,
        chooseBestPiecePlay(X,Y,Xquad0,Yquad0,Xquad1,Yquad1,Xquad0,Yquad0,Xquad1,Yquad1,Board,BestPlayP,0,XmoveP,YmoveP),
        X1 is X+1,
        ((BestPlayP > BestPlay)->chooseBestPlay(2,Board,X1,1,BestPlayP,XmoveP,YmoveP,X,Y);chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource)).
%Player 1 Pieces 
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,s1),
        X1 is X+1,
        chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,m1),
        X1 is X+1,
        chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,l1),
        X1 is X+1,
        chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource).
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X> 0, X <5,Y ==5,
        getCell(X,Y,Board,C),
        last(C,x),
        X1 is X+1,
        chooseBestPlay(2,Board,X1,1,BestPlay,Xmove,Ymove,Xsource,Ysource).
%Last Position
chooseBestPlay(2,Board,X,Y,BestPlay,Xmove,Ymove,Xsource,Ysource):-
        X == 5,Y== 5.
        
%------ Chooses best piece move -------%
%Top Point conditions
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 <1,Y1>1,chooseBestPiecePlay(X,Y,1,Y1,X2,Y2,1,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >1,Y1 <1,chooseBestPiecePlay(X,Y,X1,1,X2,Y2,X3,1,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 <1,Y1<1,chooseBestPiecePlay(X,Y,1,1,X2,Y2,1,1,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).
%Bot point conditions
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X2 >5,Y2 <6 ,chooseBestPiecePlay(X,Y,X1,Y1,5,Y2,X3,Y3,5,Y4,Board,BestPlay,Stop,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X2 < 6,Y2 >5,chooseBestPiecePlay(X,Y,X1,Y1,X2,5,X3,Y3,X4,5,Board,BestPlay,Stop,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X2 >5,Y2>5,chooseBestPiecePlay(X,Y,X1,Y1,5,5,X3,Y3,5,5,Board,BestPlay,Stop,Xmove,Ymove).
%When coords are right
%Normal move right
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        Y1 \= Y4,
        write('1\n'),
        checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('valid move \n'),
        calPlayerPiecesPosition(X1,Y1,Board,-1,BestPlay2),
        write(BestPlay2),
        Ycoord1 is Y1+1,
        BestPlay2 > BestPlay,
        chooseBestPiecePlay(X,Y,X1,Ycoord1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay2,Stop,X1,Y1).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        Y1 \= Y4,
        write('2\n'),
        \+checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('invalid move\n'),
        Ycoord1 is Y1+1,
        chooseBestPiecePlay(X,Y,X1,Ycoord1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        Y1 \= Y4,
        write('3\n'),
        checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('valid move\n'),
        calPlayerPiecesPosition(X1,Y1,Board,-1,BestPlay2),
        write(BestPlay2),
        Ycoord1 is Y1+1,
        BestPlay2 < BestPlay,
        chooseBestPiecePlay(X,Y,X1,Ycoord1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).

%Last Row go down
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        Y1 == Y4,
        checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('valid move\n'),
        calPlayerPiecesPosition(X1,Y1,Board,-1,BestPlay2),
        write(BestPlay2),
        Xcoord1 is X1+1,
        Ycoord1 is X3,
        BestPlay2 > BestPlay,
        chooseBestPiecePlay(X,Y,Xcoord1,Ycoord1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay2,Stop,X1,Y1).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        Y1 == Y4,
        checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('valid move\n'),
        calPlayerPiecesPosition(X1,Y1,Board,-1,BestPlay2),
        write(BestPlay2),
        Xcoord1 is X1+1,
        Ycoord1 is X3,
        BestPlay2 < BestPlay,
        chooseBestPiecePlay(X,Y,Xcoord1,Ycoord1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        Y1 == Y4,
        \+ checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('invalid move\n'),
        Xcoord1 is X1+1,
        Ycoord1 is X3,
        chooseBestPiecePlay(X,Y,Xcoord1,Ycoord1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove).
%Last position
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        X1 == X4,
        Y1 == Y4,
        checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('valid move\n'),
        calPlayerPiecesPosition(X1,Y1,Board,-1,BestPlay2),
        write(BestPlay2),
        BestPlay2 > BestPlay,
        chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay2,1,X1,X2).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        X1 == X4,
        Y1 == Y4,
        checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('valid move\n'),
        calPlayerPiecesPosition(X1,Y1,Board,-1,BestPlay2),
        write(BestPlay2),
        BestPlay2 < BestPlay,
        chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,1,Xmove,Ymove).
chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,Stop,Xmove,Ymove):-
        X1 >0,X1 <6,X2>0,X2<6,Y1>0,Y1<6,Y2>0,Y2<6,
        X1 == X4,
        Y1 == Y4,
        \+ checkIsValidMove(X, Y,X1,Y1, 2, Board),
        write('invalid move\n'),
        chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,1,Xmove,Ymove).

chooseBestPiecePlay(X,Y,X1,Y1,X2,Y2,X3,Y3,X4,Y4,Board,BestPlay,1,Xmove,Ymove).
%-------Calculates Number of Player Pieces in Position ---%
calPlayerPiecesPosition(X,Y,Board,-1,ReturnValue):-
        getCell(X,Y,Board,C),
        \+ (last(C,s2);last(C,m2);last(C,l2)),
        write('Vou calcular o valor visto q n tem 2\n'),
        calValue(s1,X,Y,Board,0,Value),
        write(Value),
        calValue(m1,X,Y,Board,0,Value2),
        write(Value2),
        calValue(l1,X,Y,Board,0,Value3),
        write(Value3),
        Value4 is Value+Value2,
        ReturnValue is Value4+Value3,
        write(ReturnValue),
        calPlayerPiecesPosition(X,Y,Board,0,ReturnValue).
calPlayerPiecesPosition(X,Y,Board,-1,ReturnValue):-
        getCell(X,Y,Board,C),
        (last(C,s2);last(C,m2);last(C,l2)),
        ReturnValue = 0,
        calPlayerPiecesPosition(X,Y,Board,0,ReturnValue).
calPlayerPiecesPosition(X,Y,Board,0,ReturnValue).

calValue(s1,X,Y,Board,1,Value).
calValue(s1,X,Y,Board,0,Value):-
        getCell(X,Y,Board,C),
        count(s1,C,V),
        Value = V,
        write(Value),
        calValue(s1,X,Y,Board,1,Value).
calValue(m1,X,Y,Board,1,Value).
calValue(m1,X,Y,Board,0,Value):-
        getCell(X,Y,Board,C),
        count(m1,C,V),
        Value = V,
        write(Value),
        calValue(m1,X,Y,Board,1,Value).
calValue(l1,X,Y,Board,1,Value).
calValue(l1,X,Y,Board,0,Value):-
        getCell(X,Y,Board,C),
        count(l1,C,V),
        Value = V,
        write(Value),
        calValue(l1,X,Y,Board,1,Value).
%-----------------------------BOT----------------------------------- %


%Place Player Pieces int the board
positionPlayerPieces(N,T,NewBoard):-
        %write('Placing Player1 SmallPieces\n'),
        positionSmallPiecies(N,T,New1),
        positionMediumPiecies(N,New1,New2),
        positionLargePiecies(N,New2,NewBoard).

%Place Small Player Piecies 

positionSmallPiecies(N,T,NewBoard):-
        %write('Placing Player SmallPiece\n'),
        ( (N == 1)->(placePiece(N,T,NewBoard1,0,s1),
        placePiece(N,NewBoard1,NewBoard2,0,s1),
        placePiece(N,NewBoard2,NewBoard,0,s1));
        (placePiece(N,T,NewBoard1,0,s2),
        placePiece(N,NewBoard1,NewBoard2,0,s2),
        placePiece(N,NewBoard2,NewBoard,0,s2))).

positionMediumPiecies(N,T,NewBoard):-
        %write('Placing Player SmallPiece\n'),
        ( (N == 1)->(placePiece(N,T,NewBoard1,0,m1),
        placePiece(N,NewBoard1,NewBoard2,0,m1),
        placePiece(N,NewBoard2,NewBoard,0,m1));
        (placePiece(N,T,NewBoard1,0,m2),
        placePiece(N,NewBoard1,NewBoard2,0,m2),
        placePiece(N,NewBoard2,NewBoard,0,m2))).

positionLargePiecies(N,T,NewBoard):-
        %write('Placing Player SmallPiece\n'),
        ( (N == 1)->(placePiece(N,T,NewBoard1,0,l1),
        placePiece(N,NewBoard1,NewBoard2,0,l1),
        placePiece(N,NewBoard2,NewBoard,0,l1));
        (placePiece(N,T,NewBoard1,0,l2),
        placePiece(N,NewBoard1,NewBoard2,0,l2),
        placePiece(N,NewBoard2,NewBoard,0,l2))).

placePiece(N,T,NewBoard,Placed,Char):-
         Placed == 0,
         %write('Vou gerar um posição\n'),
         generateRandomNumber(X,Y),
         %write('Gerei um posição\n'),
         %write(X),
         %write(Y),
         getCell(X,Y,T,[C]),
         %write(C),
         ((C == empty)->(
                %write('\nEncontrei uma celula vazia\n'),                           
                emptyCell(X,Y,T,NewT),
                %write('Limpei a casa\n'),
                setCell(X,Y,NewT,[Char],NewBoard),
                %write('Dei set\n'), 
                %getCell(X,Y,NewBoard,[B]),
                %write(B),
                placePiece(N,T,NewBoard,1,Char)); (placePiece(N,T,NewBoard,Placed,Char))).
         

placePiece(N,T,NewBoard,Placed,Char):-
         Placed == 1.      

%Generates a random Coord(X,Y) [1,5]
generateRandomNumber(X,Y):-
        random(1,6,X),
        random(1,6,Y).


equalPosition(X,Y,Z,X1,Y1,Z1):-
        ((X == X1)->((Y == Y1)->((Z == Z1)->true))).        

%Locks Piece
lockPiece(Player):-
        lockedPieces(Player, CurrentPieces),
        NewPieces is CurrentPieces + 1,
        retract(lockedPieces(Player, _)),
        assert(lockedPieces(Player, NewPieces)).

%Unclock Piece
unlockPiece(1):-
        lockedPieces(1, CurrentPieces),
        NewPieces is CurrentPieces - 1,
        retract(lockedPieces(1, _)),
        assert(lockedPieces(1, NewPieces)).
unlockPiece(2):-
        lockedPieces(2, CurrentPieces),
        NewPieces is CurrentPieces - 1,
        retract(lockedPieces(2, _)),
        assert(lockedPieces(2, NewPieces)).
unlockPiece(C):-
        ((last(C,s1))->unlockPiece(1));true,
        ((last(C,m1))->unlockPiece(1));true,
        ((last(C,l1))->unlockPiece(1));true,
        ((last(C,s2))->unlockPiece(2));true,
        ((last(C,m2))->unlockPiece(2));true,
        ((last(C,l2))->unlockPiece(2));true.
      
%Checks if the player can move certain Piece from (Row, Col) to (RowDest,ColDest) in the Board
checkIsValidMove(Row, Col,RowDest,ColDest, 1, Board):-
        getCell(Row,Col,Board,C),
        write(C),nl,
        getCell(RowDest,ColDest,Board,D),
        write(D),nl,
        
         ((last(D,x))->fail;true),
         ((last(D,center))->fail;true),
         ((last(C,x))->fail;true),
         ((last(C,s1))->( ((areAdjacent(Row,Col,RowDest,ColDest,3))->true;fail),
                          ((last(D,x))->fail;true),
                          ((last(D,s2))->lockPiece(2);true),
                          ((last(D,m2))->fail;true),
                          ((last(D,l2))->fail;true),
                          ((last(D,s1))->lockPiece(1);true),
                          ((last(D,m1))->fail;true),
                          ((last(D,l1))->fail;true));true),
         ((last(C,m1))->( ((areAdjacent(Row,Col,RowDest,ColDest,2))->true;fail),
                          ((last(D,x))->fail;true),
                          ((last(D,s2))->lockPiece(2);true),
                          ((last(D,m2))->lockPiece(2);true),
                          ((last(D,l2))->fail;true),
                          ((last(D,s1))->lockPiece(1);true),
                          ((last(D,m1))->lockPiece(1);true),
                          ((last(D,l1))->fail;true));true),
         ((last(C,l1))->( ((areAdjacent(Row,Col,RowDest,ColDest,1))->true;fail),
                          ((last(D,x))->fail;true),
                          ((last(D,s2))->lockPiece(2);true),
                          ((last(D,m2))->lockPiece(2);true),
                          ((last(D,l2))->lockPiece(2);true),
                          ((last(D,s1))->lockPiece(1);true),
                          ((last(D,m1))->lockPiece(1);true),
                          ((last(D,l1))->lockPiece(1);true));true),
         ((last(C,s2))->fail;true),
         ((last(C,m2))->fail;true),
         ((last(C,l2))->fail;true).

checkIsValidMove(Row, Col,RowDest,ColDest, 2, Board):-
        getCell(Row,Col,Board,C),
        write(C),nl,
        getCell(RowDest,ColDest,Board,D),
        write(D),nl,
        
        ((last(D,center))->fail;true),
         ((last(C,x))->fail;true),
         ((last(C,s2))->( ((areAdjacent(Row,Col,RowDest,ColDest,3))->true;fail),
                          ((last(D,x))->fail;true),
                          ((last(D,s1))->lockPiece(1);true),
                          ((last(D,m1))->fail;true),
                          ((last(D,l1))->fail;true),
                          ((last(D,s2))->lockPiece(2);true),
                          ((last(D,m2))->fail;true),
                          ((last(D,l2))->fail;true));true),
         ((last(C,m2))->( ((areAdjacent(Row,Col,RowDest,ColDest,2))->true;fail),
                          ((last(D,x))->fail;true),
                          ((last(D,s1))->lockPiece(1);true),
                          ((last(D,m1))->lockPiece(1);true),
                          ((last(D,l1))->fail;true),
                          ((last(D,s2))->lockPiece(2);true),
                          ((last(D,m2))->lockPiece(2);true),
                          ((last(D,l2))->fail;true));true),
         ((last(C,l2))->( ((areAdjacent(Row,Col,RowDest,ColDest,1))->true;fail),
                          ((last(D,x))->fail;true),
                          ((last(D,s1))->lockPiece(1);true),
                          ((last(D,m1))->lockPiece(1);true),
                          ((last(D,l1))->lockPiece(1);true),
                          ((last(D,s2))->lockPiece(2);true),
                          ((last(D,m2))->lockPiece(2);true),
                          ((last(D,l2))->lockPiece(2);true));true),
         ((last(C,s1))->fail;true),
         ((last(C,m1))->fail;true),
         ((last(C,l1))->fail;true).

movePiece(Row,Col,RowDest,ColDest,Board,NewBoard):-
        getCell(Row,Col,Board,C),
        lastElem(C,Las),
        % write(Las),
        emptyCell(Row,Col,Board,NewBoard1),
        
        getCell(Row,Col,NewBoard1,C2),
        write(C2),nl,
        unlockPiece(C2),
        %getCell(RowDest,ColDest,NewBoard1,D),
        %append(D,Las,NewCell),
        setCell(RowDest,ColDest,NewBoard1,[Las],NewBoard).