# Teriash Galaxy v9.1 Embedded Clan

Na screenie z konsoli było widać:

- `TDG panel fix v8.5 ACTIVE`
- `TDG window reskin v8.6 ACTIVE`
- `Teriash Galaxy v9.0 Main Clan Fix loaded`

ale BRAKOWAŁO:

`TDG main clan extension v9.0 ACTIVE`

To znaczy, że plik `extensions/clan-theme.js` nie został wykonany.
Najbardziej prawdopodobna przyczyna to zdalne ładowanie pliku przez CDN.

## Co zmienia v9.1

`clan-theme.js` jest teraz osadzony bezpośrednio w userscripcie.
Nie jest już pobierany jako osobny plik do wykonania.

Po starcie w konsoli MUSZĄ pojawić się:

- `TDG main clan extension v9.0 ACTIVE`
- `TDG embedded clan module v9.1 EXECUTED`
- `Teriash Galaxy v9.1 Embedded Clan loaded`

Jeżeli te trzy wpisy są widoczne, mechanizm stylowania klanu faktycznie działa.

Całą paczkę wrzuć do repo i zaktualizuj userscript w Tampermonkey.
