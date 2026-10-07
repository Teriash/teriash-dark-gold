# Teriash Dark Gold v6

Modułowa wersja motywu pod aktualny Nowy Interfejs Margonem.

## Struktura
- `teriash-dark-gold.user.js` — tylko loader
- `theme/` — osobne CSS-y dla HUD-u, chatu, prawego panelu, okien i tooltipów
- `extensions/` — osobne pliki JS
- `assets/` — osobne PNG dla konkretnych części interfejsu

## Instalacja
1. Wrzuć CAŁĄ zawartość ZIP-a do głównego katalogu repozytorium:
   `Teriash/teriash-dark-gold`
2. Pliki muszą być na gałęzi `main`.
3. Repozytorium musi być publiczne, żeby `raw.githubusercontent.com` mogło serwować pliki gry.
4. W Tampermonkey zainstaluj:
   `teriash-dark-gold.user.js`
5. Wyłącz starsze wersje Dark Gold.
6. Zrób Ctrl+F5.

## Ważne
Loader pobiera CSS/JS z repo przez `GM_xmlhttpRequest`, dlatego:
- nie ma problemu z MIME typu `text/plain` dla modułów GitHub RAW,
- każda aktualizacja dostaje cache-busting,
- możesz podmieniać pojedyncze grafiki i po odświeżeniu gry widzieć nową wersję.

Motyw nie ustawia geometrii kluczowych elementów NI (width/height/top/left/margin/padding/transform).
