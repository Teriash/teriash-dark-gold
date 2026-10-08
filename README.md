# Teriash Galaxy v13.3 — Tip Priority

Poprawka na zasłanianie tipów przez puste sloty.

Zmiany:
- overlay pustych slotów ma teraz bardzo niski `z-index: 10`,
- puste sloty są jeszcze trochę ciemniejsze,
- dodałem wymuszenie wysokiego `z-index` dla typowych selektorów tipów:
  - `#tip`
  - `.tip`
  - `.tooltip`
  - `.item-tip`
  - `.t_item`
  - oraz selektory zawierające `tip` w id/klasie.

To jest wersja stricte pod priorytet tipów nad overlayem pustych slotów.
