# Teriash Galaxy v12.1 — Inventory + Shop Slots

Baza: v12.0.

Poprawia sloty:
- torby / inventory,
- ekwipunku,
- dynamicznych okien sklepów,
- legacy `#shop_store`, `#shop_buy`, `#shop_sell`.

## Aktualny NI

Torba korzysta m.in. z:
- `.inventory-grid-bg`
- `.interface-element-item-slot-grid-stretch`
- `.inventory-grid`
- `.inventory-item`

Siatka torby ma krok 33 px, dlatego dodałem osobny Galaxy slot 33×33.

## Assety

- `assets/equipment/slot-grid-v121.png` — torba / sklepy
- `assets/equipment/slot-single-v121.png` — pojedyncze sloty ekwipunku

## Moduły

- `theme/92-inventory-shop-slots-v121.css`
- `extensions/inventory-shop-slots-v121.js`

Nie zmienia layoutu ani położenia itemów.
