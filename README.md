# Teriash Galaxy v11.6 — Seam Seal

Bazą jest v11.5, bo ona zmienia już praktycznie cały interfejs.

v11.6 NIE przebudowuje wyglądu od nowa. Naprawia tylko prześwity i szczeliny.

## Co robi
- nadaje `.clan` pełne Galaxy tło, aby mapa nie prześwitywała przez puste miejsca,
- uszczelnia `#clanmenu` i `#clanbox`,
- wypełnia transparentne wrappery wewnątrz klanu,
- przykrywa 1–3 px szczeliny przez `box-shadow` / `outline`,
- neutralizuje jasne/żółte resztki separatorów.

## Czego NIE robi
- nie zmienia `position`,
- nie zmienia `width` / `height`,
- nie zmienia `display`,
- nie przesuwa żadnego okna.

Nowy plik:
`theme/87-seam-seal-v116.css`

W Tampermonkey nadal instalujesz tylko:
`teriash-dark-gold.user.js`
