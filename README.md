# Teriash Galaxy v8.9 Clan Hard Override

Ta wersja jest zrobiona pod problem widoczny na screenie:
- zielony środek rekrutacji,
- brązowy pasek `Atrybuty klanu`,
- brązowy separator na dole,
- stare drewniane pionowe elementy,
- pozostałe szare/ciemne kafle.

Najważniejsza różnica względem v8.8:
krytyczne style klanu są teraz osadzone bezpośrednio w userscripcie,
więc nie zależą od cache `clan-iframe.css`.

Dodatkowo skrypt:
- bezpośrednio ustawia style na dokładnych klasach rekrutacji,
- obserwuje zmiany DOM przez MutationObserver,
- po każdej zmianie/kliknięciu ponownie styluje nowo utworzone elementy,
- wykrywa strukturalne zielone/brązowe/szare/beżowe tła i zmienia je na Galaxy,
- omija outfity, ikony, logo klanu, itemy i grafiki postaci.

W konsoli iframe powinno pojawić się:
`TDG guild iframe v8.9 ACTIVE`
