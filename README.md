# Teriash Galaxy v12.6 — Slot Regions

v12.5 poprawnie znalazł raster, ale nakładał go jako background na rodzica.
Jeżeli rodzicem był duży panel/sklep/prawa kolumna, kwadraty pokrywały całe tło.

v12.6 zmienia podejście:

- nie ustawia już gridowego backgroundu na żadnym panelu gry,
- wykrywa klastry itemów po realnej geometrii 32/33 px,
- szuka najmniejszego sensownego wspólnego kontenera,
- tworzy przezroczystą nakładkę TYLKO nad obszarem slotów,
- nakładka rysuje wyłącznie obramowania kwadratów, więc nie zasłania itemów,
- ma zabezpieczenie przed ogromnymi overlayami całego okna/ekranu,
- jeśli nie znajdzie dobrego kontenera, ogranicza się tylko do zajętego obszaru + 1 komórka.

Log:
`TDG slot regions v12.6: X [...]`
