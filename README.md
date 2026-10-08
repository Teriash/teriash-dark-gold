# Teriash Galaxy v9.9 — Clan Rails

Bazą jest działająca v9.8. Nie ma już agresywnego skanowania ramek.

Pozostałe drewniane elementy są teraz MASKOWANE osobnymi Galaxy rails
na podstawie rzeczywistych pozycji:
- `.clan`
- `#clanmenu`
- `#clanbox`

Skrypt przykrywa:
- lewą drewnianą belkę,
- środkowy pionowy separator,
- prawą drewnianą belkę,
- cienką belkę pod górnym nagłówkiem,
- dolną drewnianą belkę,
- poziomy separator pod atrybutami rekrutacji.

Nagłówek `Atrybuty klanu` jest dodatkowo wymuszany inline na Galaxy.

To rozwiązanie nie przerabia menu, tabel, kart ani atrybutów, więc nie
powinno powodować regresji wyglądu jak wcześniejsze szerokie skanery.

Moduły:
- `theme/60-clan-v99.css`
- `extensions/clan-theme-v99.js`
- `assets/clan/rail-h-v99.png`
- `assets/clan/rail-v-v99.png`

Instalujesz nadal tylko:
`teriash-dark-gold.user.js`

Log:
`TDG clan rails v9.9 ACTIVE`
