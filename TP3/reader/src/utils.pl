
% -- Initial Board --%
board([
         [[x],[empty],[empty],[empty],[x]],
         [[x],[empty],[empty],[empty],[empty]],
         [[empty],[empty],[center],[empty],[empty]],
         [[x],[empty],[empty],[empty],[empty]],
         [[x],[empty],[empty],[empty],[x]]
      ]).

%TRANSLATES
translate(b1, '/').
translate(b2, '\\').
translate(b3, '|').
translate(under, '_').
translate(empty,  ' ').
translate(x,  'xx').
translate(center, 'O').

translate(s1, '1s').
translate(m1, '1m').
translate(l1, '1l').
translate(s2, '2s').
translate(m2, '2m').
translate(l2, '2l').


% -- Changing Board Game -- %

% - Getting Cell - %
getCell(1, Col, [H | _], Cell):-
        getCellColl(Col, H, Cell).
getCell(Row, Col, [_ | T], Cell):-
        Row > 1, Row < 6,
        Col > 0, Col < 6,
        NewRow is Row - 1,
        getCell(NewRow, Col, T, Cell).

getCellColl(1, [H|_], H).
getCellColl(Col, [_|T1], Cell):-
        Col > 1, Col < 6,
        NewCol is Col-1,
        getCellColl(NewCol, T1, Cell).

% - Setting Board Game- %
% test to getCell: board(X), getCell(5,4,X,[C]). Para sacares o valore atómico tens de por parenteses retos no C, senão tens o C como lista

setCell(1, Col, [H1 | T], Change, [H2 | T]):-
        setCellColl(Col, H1 , Change, H2).
setCell(Row, Col, [H | T1], Change, [H | T2]):-
        NewRow is Row - 1,
        setCell(NewRow, Col, T1, Change, T2).

setCellColl(1, [H1|T], Change, L):-
        append(H1, Change, H2),
        append([H2], T, L).
setCellColl(Col, [H|T1], Change, [H|T2]):-
        NewCol is Col-1,
        setCellColl(NewCol, T1, Change, T2).

% - Empty a Cell -%
emptyCell(1, Col, [H1 | T], [H2 | T]) :-
        emptyCellCol(Col, H1, H2).
emptyCell(Row, Col, [H | T1], [H | T2]):-
        Row > 1, Row < 6,
        NewRow is Row - 1,
        emptyCell(NewRow, Col, T1, T2).

emptyCellCol(1, [H1 | T], [H2 | T]):-
        list_butlast(H1,H2).
emptyCellCol(Col, [H | T1], [H | T2]):-
        Col > 1, Col < 6,
        NewCol is Col - 1,
        emptyCellCol(NewCol, T1, T2).

%test
list_butlast([X|Xs], Ys) :-                 % use auxiliary predicate ...
   list_butlast_prev(Xs, Ys, X).            % ... which lags behind by one item

list_butlast_prev([], [], _).
list_butlast_prev([X1|Xs], [X0|Ys], X0) :-  
   list_butlast_prev(Xs, Ys, X1).           % lag behind by one

lastElem(0,L).
lastElem([X],L):-
        append([],X,L),
        lastElem(0,L).
lastElem([Y|Tail],L):-
        lastElem(Tail,L).

% Counts number of elements X in a certain list
count(_, [], 0) :- !. /* empty list, base case */

count(X, [X|T], N) :- /* if X is in the head of the list */
    count(X, T, N2), /* count on the tail (let this N2) */
    N is N2 + 1.     /* and N is N2 + 1  */

count(X, [Y|T], N) :- 
    X \= Y,          /* if X is not in the head */
    count(X, T, N).  /* just count the rest */

%Checks if positions are adjacent
areAdjacent(X,Y,X1,Y1,Diff):-
        DiffX is X1-X,
        DiffY is Y1-Y,
        (((DiffX >Diff);(DiffY >Diff))->false;true),
        (((X ==X1),(Y == Y1))->false;true).

% -- Display Board -- %
display_tab(Board):-
        %display_top,
        display_board(Board,0,0).
        %display_down.

display_top:-
        printUnderLine,nl,
        printSecondLineTab(b1,b2,empty),nl.

display_down:-
         printSecondLineTab(b2,b1,under),nl.
        

display_board([],N,N2).
display_board([L1|Le],N,N2):-
        SpacesP is 3-N,
        ((N2 == 0) -> (%printChar(0,SpacesP,empty),
                      %printChar(0,1,b1),
                      display_row(L1,1,1,0),
                      %printChar(0,1,b2),
                      nl,
                      NextN is N +1);true),
        ((N2 == 1) -> (%printChar(0,SpacesP,empty),
                      %printChar(0,1,b1),
                      display_row(L1,2,2,0),
                      %printChar(0,1,b2),
                      nl,
                      NextN is N +1);true),
        ((N2 == 2) -> (%printChar(0,SpacesP,empty),
                      %printChar(0,1,b3),
                      display_row(L1,3,2,0),
                      %printChar(0,1,b3),
                      nl,
                      NextN is N -1);true),
        ((N2 == 3) -> (%printChar(0,SpacesP,empty),
                      %printChar(0,1,b2),
                      display_row(L1,4,2,0),
                      %printChar(0,1,b1),
                      nl,
                      NextN is N -1);true),
        ((N2 == 4) -> (%printChar(0,SpacesP,empty),
                      %printChar(0,1,b2),
                      display_row(L1,5,1,0),
                      %printChar(0,1,b1),
                      nl,
                      NextN is N -1);true),
        Next2 is N2+1,
        display_board(Le,NextN,Next2).

display_row([],N,NumberSpaces,Index).
display_row([R|Re],N,NumberSpaces,Index):-
        write('('),
        display_column(R),
        write(')'),
        Ip is NumberSpaces - 1,
        ((Index \= 4)->(
        ((N ==1)->(printChar(0,NumberSpaces,empty));true),
        ((N == 2)->(((Index <2)->(printChar(0,Ip,empty));(printChar(0,NumberSpaces,empty))));true),
        ((N == 3)->(printChar(0,NumberSpaces,empty));true),
        ((N == 4)->(((Index <2)->(printChar(0,Ip,empty));(printChar(0,NumberSpaces,empty))));true),
        ((N ==5)->(printChar(0,NumberSpaces,empty));true));true),
        NewIndex is Index +1,
        display_row(Re,N,NumberSpaces,NewIndex).

display_column([]).
display_column([C|Ce]):-
        %write('Printing Element\n'),
        display_element(C),
        display_column(Ce).

display_element(C) :-
        translate(C,V),
        write(V).
% Clear Screen %

clearScreen(0).
clearScreen(N):- nl, N1 is N-1, clearScreen(N1).
%Prints a TotalChars number of C char
printChar(CharsDone,TotalChars,C):-
        CharsDone < TotalChars,
        translate(C,S),
        write(S),
        SpacesDoneN is CharsDone+1,
        printChar(SpacesDoneN, TotalChars,C).
printChar(CharsDone,TotalChars,C):-
        CharsDone >= TotalChars.

%Printes the under line      
printUnderLine:-
        printChar(0,5,empty),
        printChar(0,12,under).

%Generates Second line Tab
printSecondLineTab(B1,B2,C1):-
        printChar(0,4,empty),
        printChar(0,1,B1),
        printChar(0,12,C1),
        printChar(0,1,B2).