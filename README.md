# Teriash Dark Gold v7

Wersja przebudowana na architekturę podobną do systemu rozszerzeń:
- osobny loader,
- osobne moduły CSS,
- osobne rozszerzenia JS,
- osobne assety PNG.

Najważniejsze zmiany:
- HUD używa pełnych grafik belki zamiast powtarzalnego ornamentu,
- styl lootloga został dopasowany do Dark Gold,
- tipy NPC mają własne klasy i kolory,
- znacznik kliknięcia na mapie ma własną grafikę,
- rozszerzenia czekają na `Engine.allInit` zamiast wykonywać się za wcześnie,
- starsze wersje Dark Gold powinny być wyłączone.

## Repo
Wgraj całą zawartość do:
`Teriash/teriash-dark-gold`

Gałąź:
`main`

Potem zainstaluj `teriash-dark-gold.user.js` w Tampermonkey.
