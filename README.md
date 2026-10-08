# Teriash Galaxy v8.7 Clan Complete

Ta wersja naprawia problem widoczny na screenie z oknem **Klany**.

Kluczowa zmiana:
okno klanu jest ładowane jako osobna strona/iframe z `www.margonem.pl/guilds/...`.
Poprzednie wersje motywu wykluczały `www.margonem.pl`, więc mogły stylować tylko zewnętrzne
okno NI, ale nie całe wnętrze klanu.

v8.7:
- uruchamia osobny styl bezpośrednio w guild iframe,
- zmienia drewniane ramy i separatory,
- zmienia szare przyciski menu,
- styluje aktywną pozycję menu,
- styluje tabele klanowiczów, nagłówki, komórki i hover,
- styluje formularze, przyciski, rekrutację, skarbiec, zarządzanie i dyplomację,
- ma dodatkowe wykrywanie starych elementów z graficznym tłem i podmienia je na galaxy,
  bez ruszania outfitów, ikon, logo klanu i grafik postaci.

Nowe pliki:
- `theme/clan-iframe.css`
- `assets/clan/clan-bg-v87.png`
- `assets/clan/clan-panel-v87.png`
- `assets/clan/clan-menu-v87.png`
- `assets/clan/clan-menu-active-v87.png`
- `assets/clan/clan-horizontal-v87.png`
- `assets/clan/clan-vertical-v87.png`

Po otwarciu Klany w konsoli iframe powinno pojawić się:
`TDG guild iframe v8.7 ACTIVE`
