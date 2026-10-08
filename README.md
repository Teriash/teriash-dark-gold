# Teriash Galaxy v12.2 — Separated Slots

Poprawka do v12.1.

Problem:
slot 33×33 był wypełniony prawie do samej krawędzi. Po powtórzeniu grafiki
kolejne sloty wizualnie zlewały się w jedną płaszczyznę.

v12.2:
- nowy `slot-grid-v122.png` ma wyraźny gutter między każdą komórką,
- każda kratka ma własną obwódkę i osobne ciemne wnętrze,
- siatka nadal ma dokładnie 33 px kroku, zgodnego z pozycjami itemów NI,
- wyłączona jest druga warstwa kafelkowania na `.scroll-pane`,
  żeby dwie siatki nie nakładały się na siebie,
- pojedyncze sloty ekwipunku/sklepu mają osobny `slot-single-v122.png`.

Pliki:
- `assets/equipment/slot-grid-v122.png`
- `assets/equipment/slot-single-v122.png`
- `theme/92-inventory-shop-slots-v122.css`
- `extensions/inventory-shop-slots-v122.js`
