# Teriash Galaxy v12.4 — Exact Slot Grid

To jest przebudowana poprawka slotów oparta o rzeczywiste kontenery gry,
a nie heurystyczne wykrywanie rodziców.

## Potwierdzone z klienta Margonem

Torba:
- `.inventory-grid-bg`
- `.interface-element-item-slot-grid-stretch`
- `.inventory-grid .inner-grid > .scroll-pane`
- itemy w `.scroll-pane` mają `left/top = wielokrotność 33px`

Sklep:
- `#shop_store`
- `#shop_buy`
- `#shop_sell`
- klient ustawia itemy jako `left: 33*x`, `top: 33*y`

Depozyt:
- `#depo-items`
- szerokość zakładki = `462px = 14 * 33px`
- itemy mają `left/top = 33*x / 33*y`

Dlatego v12.4 maluje dokładną siatkę 33×33 bezpośrednio na tych elementach.

## Grafika

`assets/equipment/slot-grid-exact-v124.png`

Każdy kafelek:
- ma 32×32 własnego slotu,
- 33. piksel tworzy ciemną przerwę,
- dzięki temu każda pusta komórka jest osobnym kwadratem.

## Moduły

- `theme/92-exact-slot-grid-v124.css`
- `extensions/exact-slot-grid-v124.js`
