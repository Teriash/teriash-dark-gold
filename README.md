# Teriash Galaxy v11.0 — Component Theme

Ta wersja zmienia podejście.

Po przejrzeniu struktury Maddonz zastosowałem podobny model:
- centralne CSS variables/tokens z URL-ami grafik,
- osobne, stabilne komponenty,
- konkretne selektory dla konkretnych okien,
- bez globalnego zgadywania "czy coś jest brązowe".

## Maddonz-style architecture

`theme/80-component-tokens-v110.css`
definiuje wspólne zasoby:
- `--tg-panel`
- `--tg-bar-h`
- `--tg-bar-v`
- `--tg-control`
- `--tg-control-active`
- `--tg-row`
- `--tg-frame`

Pozostałe pliki tylko korzystają z tych tokenów.

## Moduły

- `theme/81-component-core-v110.css` — bazowe Galaxy components
- `theme/82-social-v110.css` — Społeczność / Przyjaciele / Wrogowie
- `theme/83-clan-components-v110.css` — Klany
- `theme/84-legacy-components-v110.css` — dialogi, trade, config itd.
- `extensions/component-theme-v110.js` — tylko tagowanie znanych okien

Nie ma skanowania koloru drewna ani background-image po całym DOM.

W Tampermonkey nadal instalujesz tylko:
`teriash-dark-gold.user.js`

Log:
`TDG component theme v11.0 LOADED`
