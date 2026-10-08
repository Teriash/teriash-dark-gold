# Teriash Galaxy v12.7 — Per-Slot Squares

Ta wersja realizuje nowe podejście:
**nie wykrywa całej siatki** i nie maluje żadnego dużego tła.

Każdy rzeczywisty item/slot jest stylowany osobno.

- zajęty item 26–44 px dostaje swój własny kwadrat Galaxy,
- realne puste elementy slotów (np. `.eq-slot`) też dostają własny kwadrat,
- nie są tworzone żadne grid-overlaye ani powtarzane kafelki na panelach.

W torbie/sklepie/depozycie puste miejsca często nie mają osobnego elementu DOM.
W takim miejscu v12.7 celowo nic nie rysuje — kwadrat pojawia się tylko tam,
gdzie istnieje realny item/slot.
