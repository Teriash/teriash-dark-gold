# Teriash Galaxy v9.8 — Clan Frame Fix

Ta wersja naprawia regresję z v9.7.

## Co było zepsute w v9.7
W paczce były niespójne nazwy:
- CSS odwoływał się do `strip-h-v97.png` / `strip-v-v97.png`, których nie było,
- JS dodawał klasy `tdg97-base-*`, a CSS nadal miał część klas `tdg95-*`.

Dlatego część działającego wyglądu z v9.5 wróciła do starego stylu gry.

## Co robi v9.8
- bazuje bezpośrednio na działającym v9.5,
- wszystkie podstawowe assety Galaxy mają kompletne, istniejące nazwy v98,
- lewe menu, rekrutacja, tabele i powierzchnie zachowują wygląd v9.5,
- osobny skaner dotyka TYLKO cienkich elementów konstrukcyjnych,
- nie rusza menu, kart, tabel, atrybutów, przycisków ani inputów,
- brązowe poziome/pionowe ramy są zastępowane przez:
  - `frame-h-v98.png`
  - `frame-v-v98.png`
- pseudo-elementy z legacy grafiką są neutralizowane tylko na wykrytych elementach.

## Moduły
- `theme/60-clan-v98.css`
- `extensions/clan-theme-v98.js`

W Tampermonkey nadal instalujesz tylko:
`teriash-dark-gold.user.js`

## Logi
- `TDG clan module v9.8 LOADED`
- po otwarciu klanu: `TDG clan DOM FOUND v9.8`
- jeśli znajdzie ramy: `TDG clan frame bars v9.8: X`
