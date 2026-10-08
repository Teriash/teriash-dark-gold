# Teriash Galaxy v12.0 — Bottom Bars + Skills Fix

Baza: v11.7, bo była stabilna wizualnie.

## Co było źle

1. W aktualnym NI dolna belka ma strukturę:
   `.c-window__bottom-bar > .interface-element-bottom-bar-background-stretch`

   Wcześniejsze wersje zmieniały rodzica, ale dziecko nadal rysowało
   brązową grafikę nad naszym Galaxy.

2. W v11.9 wyszukiwanie okna Umiejętności mogło trafić w małe okno
   pomocy bojowych umiejętności, które też ma tytuł "Umiejętności".

## v12.0

- bezpośrednio podmienia `.interface-element-bottom-bar-background-stretch`,
- usuwa legacy pseudo-elementy dolnej belki,
- poprawka działa we wszystkich `.c-window`,
- główne okno Umiejętności jest wykrywane dopiero, gdy zawiera co najmniej
  dwa znaczniki:
  - Lista umiejętności,
  - Punkty umiejętności,
  - Mistrzostwo walki,
  - Reset punktów,
- dopiero wtedy podmieniana jest belka "Lista umiejętności", stopka
  i cienkie brązowe separatory.

## Logi

`TDG skills/main bottom fix v12.0 LOADED`

Po otwarciu głównego okna Umiejętności:

`TDG main skills window v12.0 FOUND`
