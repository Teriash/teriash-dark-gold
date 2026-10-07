# Teriash Dark Gold

Graficzny motyw **Dark Gold** dla Nowego Interfejsu Margonem.

## Instalacja

Po wrzuceniu plików do gałęzi `main` otwórz plik:

`teriash-dark-gold.user.js`

Najwygodniej instalować userscript z wersji RAW GitHuba.

## Edycja grafik

Grafiki znajdują się w `assets/`.

- `right-panel.png` — prawy panel / ekwipunek / statystyki
- `chat-bg.png` — tło chatu
- `window-bg.png` — tło okien
- `bar-horizontal.png` — belki
- `header-bar.png` — nagłówki
- `gold-frame.png` — złota ramka
- `slot.png` — sloty przedmiotów

Userscript pobiera je bezpośrednio z:

`https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/assets/`

Dzięki temu możesz podmienić pojedynczy PNG w repozytorium bez ponownego osadzania grafiki w kodzie.

## Ważne

Motyw nie powinien zmieniać wymiarów ani położenia elementów NI. Kod nie używa MutationObserver i nie skanuje stale DOM-u.
