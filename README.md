# Teriash Galaxy v9.7 — Stable Clan Bars

Ta wersja wraca do stabilnej logiki v9.5, która poprawnie stylowała:
- lewe menu,
- rekrutację,
- tabelę,
- galaxy tła.

Usunąłem agresywny skaner z v9.6, który psuł wygląd menu.

Dodałem tylko precyzyjną poprawkę brązowych belek:
- skaner NIE dotyka elementów wewnątrz `#clanmenu li`,
- zmienia wyłącznie cienkie poziome/pionowe elementy konstrukcyjne,
- reaguje na brązowy computed background albo starą grafikę strukturalną,
- usuwa stare pseudo-elementy `::before` / `::after`,
- dokładne nagłówki rekrutacji są wymuszane na Galaxy.

Moduły:
- `theme/60-clan-v97.css`
- `extensions/clan-theme-v97.js`

Nadal instalujesz tylko:
`teriash-dark-gold.user.js`
