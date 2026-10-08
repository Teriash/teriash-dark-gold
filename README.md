# Teriash Galaxy v9.2 Direct Clan

Log z v9.1 pokazał:
- `TDG embedded clan module v9.1 EXECUTED`
- ale brak `TDG main clan extension v9.0 ACTIVE`.

To znaczyło, że `Function(...)` uruchamiał kod w innym kontekście i
`window.__TDG` wewnątrz modułu nie był dostępny. Moduł kończył się na
`if (!TDG) return`.

## v9.2
Cała logika klanu działa teraz BEZ `Function()` i BEZ `window.__TDG`.
Korzysta bezpośrednio z `RAW`, `ROOT` i `CACHE` userscriptu.

Dodatkowo:
- krytyczny CSS klanu jest osadzony bezpośrednio w userscripcie,
- `theme/clan-main.css` nie jest wymagany do działania,
- assety dostały nowe nazwy `v92`, żeby ominąć cache CDN,
- dokładnie stylowane są `.clan`, `#clanmenu`, `.boxhover`, `#clanbox`,
  rekrutacja, członkowie, nagłówki, stare zielone/brązowe/szare powierzchnie,
- MutationObserver + cykliczny sweep obsługuje dynamiczne zakładki.

W konsoli po starcie MUSI być:
`TDG clan main v9.2 ACTIVE`

Po otwarciu Klany dodatkowo:
`TDG clan DOM FOUND v9.2`

Drugi log pokaże obiekt:
`{ clan: true/false, clanmenu: true/false, clanbox: true/false }`
co pozwoli jednoznacznie sprawdzić, który DOM faktycznie istnieje.
