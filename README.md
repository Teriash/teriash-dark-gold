# Teriash Galaxy v10.1 — Hard Legacy Texture Remover

W v10.0 log pokazał `TDG global wood replacements v10.0: 0`.
To oznaczało, że poprzedni skaner nie trafiał w mechanizm, którym gra rysuje te belki.

v10.1 sprawdza dodatkowo:
- `border-image-source`,
- `border-image`,
- `background-image`,
- pseudo-elementy `::before` / `::after`,
- cienkie strukturalne `<img>`.

Najważniejsza zmiana:
każdy obcy `border-image` w obsługiwanych oknach jest usuwany,
a cienkie poziome/pionowe elementy z obcą grafiką są zastępowane Galaxy
bez wymagania konkretnej nazwy klasy.

Zakres:
- klan,
- wszystkie `.c-window` / `.border-window`,
- chat / lewa kolumna,
- prawy panel,
- dynamicznie tworzone okna.

Nowe moduły:
- `theme/70-legacy-textures-v101.css`
- `extensions/legacy-textures-v101.js`
- `assets/global/legacy-h-v101.png`
- `assets/global/legacy-v-v101.png`
- `assets/global/legacy-panel-v101.png`

Log:
`TDG legacy replacements v10.1 { borderImage: X, h: X, v: X, panel: X, img: X }`
