# Teriash Galaxy v11.1 — Layout Safe

Ta wersja naprawia regresję v11.0, w której okna potrafiły rozciągać się
na cały ekran.

## Przyczyna

v11.0 nadpisywał m.in.:
- `position` na `.clan`,
- `position` na `.c-window.border-window`,
- nakładał frame bezpośrednio na `.clan`,
- jednocześnie nadal ładował stary `60-clan-v98.css`.

`.clan` w tym interfejsie jest kontenerem układu, a nie tylko widocznym
oknem. Zmiana jego `position` zmieniała układ absolutnie pozycjonowanych
elementów i okno robiło się ogromne.

## v11.1

- nie ustawia `position`, `width`, `height` ani `display` na oknach gry,
- nie styluje już `.clan` jako panelu,
- całkowicie usuwa `60-clan-v98.css` z loadera,
- styluje tylko `#clanmenu`, `#clanbox` i konkretne elementy klanu,
- border Galaxy jest podmieniany tylko wtedy, gdy element już miał
  `border-image` — zachowujemy istniejące wymiary,
- Społeczność korzysta z dokładnych `.frbox`,
- zachowuje architekturę komponentów i CSS variables z v11.0.

W Tampermonkey instalujesz nadal tylko:
`teriash-dark-gold.user.js`

Log:
`TDG layout-safe component theme v11.1 LOADED`
