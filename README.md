# Teriash Galaxy v11.3 — Artifact Cleanup

Naprawa dziur/artefaktów widocznych w oknach NI.

Najważniejsze zmiany:
- skaner legacy NIE dotyka już frameworkowych elementów NI takich jak
  `header-label-positioner`, `left-decor`, `right-decor`, `c-window__bottom-bar`,
  `border-image`, scrollbar itd.,
- przy każdym przebiegu usuwa przypadkowo dodane klasy `tg-auto-wood-*`
  z tych elementów,
- dodano dokładny motyw dla okna `Świat` (`.world-window`),
- dodano dokładny motyw dla `Dziennika zadań` i jego kolumn/bottom bara,
- stare stretch-backgroundy w Dzienniku są zastępowane naszym Galaxy panelem,
- wszystko nadal jest layout-safe: bez zmian `position`, `width`, `height`, `display`.

Logi:
- `TDG artifact-safe wood override v11.3 LOADED`
- `Teriash Galaxy v11.3 Artifact Cleanup loaded`
