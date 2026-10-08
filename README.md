# Teriash Galaxy v10.0 — Global Wood Replacer

Ta wersja nie skupia się już tylko na klanie / rekrutacji.

Dodałem globalny moduł, który podmienia albo wygasza drewniane belki,
separatory i papierowo-drewniane strukturalne panele w całym UI gry.

## Nowe moduły
- `theme/70-global-wood-v100.css`
- `extensions/global-wood-v100.js`
- `assets/global/wood-h-v100.png`
- `assets/global/wood-v-v100.png`
- `assets/global/wood-panel-v100.png`

## Jak działa
Skrypt:
- wykrywa elementy wyglądające jak drewniane / szaro-beżowe belki,
- podmienia cienkie poziome i pionowe elementy na Galaxy bars,
- usuwa stare pseudo-elementy `::before` / `::after`, jeśli zawierają legacy wood,
- większe brązowe strukturalne panele zamienia na Galaxy panel.

## Zakres
Przeszukiwane są m.in.:
- `.clan`
- `.c-window`
- `.border-window`
- `.window`
- lewa kolumna / chat
- prawa kolumna / ekwipunek / statystyki

## Logi
Po starcie:
- `TDG global wood replacer v10.0 LOADED`

W trakcie:
- `TDG global wood replacements v10.0: X`
