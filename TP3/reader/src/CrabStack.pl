%INCLUDES
:-include('CrabPvP.pl'). %PvP mode
:-include('CrabPvC.pl'). %PvC mode
:-include('CrabCvC.pl'). %CvC mode
:-include('GameLogic.pl').

%LIBRARIES
:- use_module(library(random)). %random


%GameStart function
crabStack:-
        clearScreen(40),  
        write('Welcome to CrabStack !!!\nBy: António Melo & Ariana Fernandes\n'),
        write('Types of games: \n Player vs Player(0)\n Player vs Computer(1)\n Computer vs Computer(2)\n'),
        read(TypeofGame), %Read Type of game
        chooseGame(TypeofGame),
        exit.

chooseGame(T):- %Pvp Mode
        T =:= 0, 
        write('PvP game starting...\n'),
        crabPvP.
chooseGame(T):- %PvC Mode
        T =:= 1, 
        write('PvC game starting...\n'),
        crabPvC.
chooseGame(T):- %CvC Mode
        T =:= 2,
        write('CvC game starting...\n'),
        crabCvC.
%Exit
exit:-
        write('Game is going to exit...\n').