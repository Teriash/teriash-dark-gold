# Teriash Galaxy v9.5 Modular Fix

Naprawa regresji z v9.4.

Klan nadal jest MODUŁEM w folderach:
- `theme/60-clan-v95.css`
- `extensions/clan-theme-v95.js`
- `assets/clan/*-v95.png`

Jest tylko jeden userscript:
- `teriash-dark-gold.user.js`

## Co poprawiono
1. Nowe, unikalne nazwy plików `v95` — omijają stary cache CDN.
2. Loader ma fallback:
   - jsDelivr
   - Statically
   - GitHub raw
3. Każdy pobrany moduł jest logowany.
4. Każde wykonane rozszerzenie jest logowane.
5. `clan-theme-v95.js` dostaje jawnie `TDG` z głównego loadera.

## Logi, które powinieneś zobaczyć
Po starcie:
- `TDG module fetched ... clan-theme-v95.js ...`
- `TDG clan module v9.5 LOADED`
- `TDG extension executed extensions/clan-theme-v95.js`
- `Teriash Galaxy v9.5 Modular Fix loaded`

Po otwarciu Klany:
- `TDG clan DOM FOUND v9.5`
