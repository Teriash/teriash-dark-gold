# Teriash Galaxy v9.6 — Clan Wood Fix

Ta wersja poprawia konkretnie pozostałe BRĄZOWE / DREWNIANE BELKI widoczne w oknie Klany.

Klan nadal jest modułem:
- `theme/60-clan-v96.css`
- `extensions/clan-theme-v96.js`
- `assets/clan/...`

W Tampermonkey nadal instalujesz tylko:
`teriash-dark-gold.user.js`

## Co zmieniono
- osobna grafika poziomych belek `wood-replace-h-v96.png`,
- osobna grafika pionowych belek `wood-replace-v-v96.png`,
- skrypt wykrywa strukturalne brązowe elementy po computed style,
- podmiana jest wykonywana inline z `!important`, więc ma pierwszeństwo nad starym CSS gry,
- wykrywane są też stare `background-image`,
- obsługiwane są pseudo-elementy `::before` / `::after`,
- duże strukturalne `<img>` są ukrywane, a ich rodzic dostaje Galaxy bar,
- outfity, ikony i małe grafiki są pomijane.

## Logi
Po otwarciu Klany:
- `TDG clan DOM FOUND v9.6`
- `TDG clan wood replacements v9.6: <liczba>`

Liczba pokazuje, ile drewnianych/strukturalnych elementów zostało podmienionych.
