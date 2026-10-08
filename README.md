# Teriash Galaxy v11.5 — Rollback Improved

Ta wersja jest cofnięta do szerokiego mechanizmu z v11.2, bo on zmieniał
najwięcej elementów i wizualnie był najbliżej celu.

Nie używa ograniczonego skanera z v11.3/v11.4.

Poprawka względem czystej v11.2:
- zachowuje szerokie podmienianie drewna/papieru/zielonych legacy paneli,
- wyklucza tylko techniczne elementy konstrukcyjne NI, które tworzyły dziury
  i wielkie artefakty (`header-label`, `border-image`, bottom bar, close decor itd.),
- przed każdym przebiegiem usuwa ewentualne stare `tg-auto-wood-*` z tych
  frameworkowych elementów,
- nie zmienia position/width/height/display.

Moduły:
- `extensions/safe-wood-override-v115.js`
- `theme/86-rollback-safety-v115.css`

Logi:
- `TDG rollback wood override v11.5 LOADED`
- `TDG rollback wood override v11.5 { ... }`
