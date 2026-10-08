# Teriash Galaxy v9.4

Teraz jest tylko **jeden userscript w głównym katalogu**:

`teriash-dark-gold.js`

Kod klanu NIE jest osobnym userscriptem.

## Struktura

- `teriash-dark-gold.js` — jedyny loader / userscript
- `theme/clan-main.css` — CSS klanu
- `extensions/clan-theme.js` — logika klanu
- `assets/clan/` — grafiki klanu

Czyli klan działa dokładnie jak pozostałe moduły motywu.

## Ważna poprawka loadera

Moduły JS są teraz uruchamiane jako:

`Function("TDG", "window", "document", source)(window.__TDG, window, document)`

Dzięki temu `extensions/clan-theme.js` dostaje kontekst motywu bez problemu sandboxu,
który wcześniej powodował, że moduł klanu się nie uruchamiał.

## Logi

Po starcie:
`TDG clan module v9.4 ACTIVE`

Po otwarciu Klany:
`TDG clan module DOM FOUND v9.4`

Nie instalujesz żadnego drugiego userscripta.
