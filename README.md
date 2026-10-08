# Teriash Galaxy v13.0 — Empty Slots

v12.9 stylował tylko istniejące/zajęte sloty.
W wielu torbach/sklepach/depo puste pola nie mają osobnych elementów DOM.

v13.0 zachowuje wygląd zajętych slotów z v12.9, a dodatkowo:
- wykrywa właściwy mały kontener itemów,
- rysuje ten sam quickbarowy kwadrat w pustych komórkach,
- nie maluje całego okna ani całego panelu.

Log: `TDG empty slot grids v13.0:`
