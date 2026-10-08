# Teriash Galaxy v9.4 — modularny Clan

Zgodnie z prośbą jest tylko JEDEN główny skrypt:

`dark-gold.js`

Kod klanu nie siedzi już w głównym pliku. Jest rozdzielony tak samo jak pozostałe części motywu:

- `theme/clan-main.css`
- `extensions/clan-theme.js`
- `assets/clan/...`

## Struktura

dark-gold.js
theme/
  base.css
  hud.css
  chat.css
  equipment.css
  windows.css
  tooltips.css
  lootlog.css
  npc-tips.css
  clan-main.css

extensions/
  engine.js
  npc-tips.js
  map-mark.js
  clan-theme.js

assets/
  clan/
  chat/
  equipment/
  hud/
  map/
  tooltips/
  widgets/
  windows/

## Jak działa Clan

`dark-gold.js` ładuje:
- `theme/clan-main.css`
- `extensions/clan-theme.js`

`extensions/clan-theme.js` dostaje z loadera:
- `RAW`
- `ROOT`
- `CACHE`

więc nie musi mieć osobnego userscriptu ani własnego loadera.

W konsoli po uruchomieniu modułu klanu powinno pojawić się:
`TDG clan main v9.2 ACTIVE`

Po otwarciu Klany dodatkowo:
`TDG clan DOM FOUND v9.2`

## Repo

Wrzuć zawartość paczki do:
`Teriash/teriash-dark-gold`

i używaj tylko `dark-gold.js`.
