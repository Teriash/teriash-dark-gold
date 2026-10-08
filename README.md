# Teriash Galaxy v10.3 — Galaxy Border Replacer

v10.1 prawidłowo usuwał drewniane `border-image`, ale po ich zdjęciu
w części miejsc zostawały jasne / białe pasy.

v10.3 robi to właściwiej:

- elementy oznaczone przez v10.1 jako `tdg101-no-border-image`
  dostają nowy GALAXY `border-image`,
- duże ramy korzystają z 9-slice `galaxy-border-v103.png`,
- cienkie poziome/pionowe elementy dostają Galaxy bars,
- jasne pozostałości po usuniętym drewnie są wykrywane i podmieniane,
- shell klanu (`.clan`, `#clanmenu`, `#clanbox`) może dostać Galaxy border
  bez zasłaniania zawartości.

Nowe pliki:
- `assets/global/galaxy-border-v103.png`
- `assets/global/galaxy-h-v103.png`
- `assets/global/galaxy-v-v103.png`
- `theme/72-galaxy-border-v103.css`
- `extensions/galaxy-border-v103.js`

Log:
`TDG galaxy borders v10.3 { border, h, v, blankH, blankV, forceH }`
