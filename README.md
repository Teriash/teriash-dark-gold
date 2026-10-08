# Teriash Galaxy v12.5 — LIVE Slot Detector

Powód, dla którego v12.4 nic nie pokazywał, jest widoczny w konsoli:

`TDG exact slot grids v12.4: 0`

Czyli w aktualnie uruchomionym kliencie nie istnieje żaden z selektorów,
na których opierała się v12.4.

v12.5 nie korzysta już z nazw kontenerów.

## Jak znajduje siatki

1. Szuka realnych ikon itemów:
   - `canvas.canvas-icon`
   - canvasy 32×32
   - fallback na obrazy ok. 32×32

2. Znajduje wrapper ~32×32 dla każdego itemu.

3. Analizuje wspólnych rodziców i pozycje itemów.

4. Jeśli pozycje tworzą raster ok. 33 px, wybiera ten rodzic jako siatkę.

5. Nakłada grafikę slotów INLINE z `!important`, więc inne moduły motywu
   nie mogą jej przykryć.

Działa na zasadzie rzeczywistego DOM i geometrii, więc nie potrzebuje nazw:
torba / sklep / depozyt / handel.

## Diagnostyka

W konsoli:

`TDG LIVE slot grids v12.5: X [...]`

Tym razem `X` powinno być większe od zera, jeśli na ekranie są itemy
ułożone w siatkę.
