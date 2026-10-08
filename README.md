# Teriash Galaxy v9.0 — Main Clan Fix

To jest poprawka wynikająca z ponownego przejrzenia wcześniejszego kodu Margonem.

Najważniejsze odkrycie:
stary widok klanu używa bezpośrednio elementów `.clan`, `#clanmenu`, `.boxhover`
oraz `#clanbox` w kliencie gry. Poprzednie wersje za mocno skupiały się na
`www.margonem.pl/guilds/...` / iframe.

v9.0 styluje klan również BEZPOŚREDNIO W GŁÓWNYM DOKUMENCIE GRY.

Dodane:
- `theme/clan-main.css`
- `extensions/clan-theme.js`

Extension:
- czeka na pojawienie się `.clan`,
- styluje `#clanmenu > .boxhover > li`,
- styluje `#clanbox`,
- styluje rekrutację, członków, skarbiec, zarządzanie, dyplomację itd.,
- wykrywa stare tła graficzne i zielone/brązowe/szare powierzchnie,
- ustawia nowe tło przez inline `!important`,
- ponawia stylowanie po kliknięciach i po zmianach DOM.

W konsoli głównej strony gry powinno być:
`TDG main clan extension v9.0 ACTIVE`

Jeżeli okno Klany jest otwarte, w `<html>` pojawi się też:
`data-tdg-clan-main="9.0"`
