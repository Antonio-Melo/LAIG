:- use_module(library(system)).

:- now(Timestamp),setrand(Timestamp).

crabPvC:-
        gameInit(1).
