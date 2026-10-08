# Teriash Galaxy v10.2 — Galaxy Bar Replacer

v10.1 usuwał drewniane belki, ale w części miejsc zostawiał po nich puste / jasne pola.

v10.2 robi drugi krok:
- wykrywa cienkie poziome i pionowe paski po usunięciu starej tekstury,
- podmienia je na galaxy `frame-h-v98.png` i `frame-v-v98.png`,
- dodatkowo wymusza galaxy na znanych belkach klanu,
- potrafi zamienić jasne/neutralne pozostałości po starych belkach,
- nadal zostawia w spokoju tabelki, itemy, sloty i normalną treść.

Nowe pliki:
- `theme/71-legacy-textures-v102.css`
- `extensions/legacy-textures-v102.js`

Log w konsoli:
`TDG galaxy replacements v10.2 { borderImage, h, v, panel, img, forceH, forceV }`
