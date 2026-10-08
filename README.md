# Teriash Galaxy v9.4 Modular

Teraz jest dokładnie tak, jak chciałeś:

## Jest tylko JEDEN userscript
`teriash-dark-gold.user.js`

Nie ma osobnego userscriptu dla klanu.

## Kod klanu jest w folderach jak reszta motywu

- `theme/60-clan.css`
- `extensions/clan-theme.js`
- `assets/clan/...`

Główny userscript tylko ładuje te moduły razem z HUD-em, chatem, oknami itd.

## Ważna poprawka loadera

Wcześniej `Function(source)()` powodował problem ze scope modułu klanu.

Teraz loader uruchamia moduły tak:

`Function("TDG", source)(window.__TDG)`

czyli każdy plik z `extensions/` dostaje jawnie kontekst motywu.

## Logi

Po starcie:
`TDG clan module v1.0 ACTIVE`

Po otwarciu Klany:
`TDG clan module DOM FOUND`

oraz normalnie:
`Teriash Galaxy v9.4 Modular loaded`
