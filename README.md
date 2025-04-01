### Autor: Natalia Kiełbasa

# E-biznes - zadania

## Zadanie 1 - Docker - Hello World
- [x] 3.0 obraz ubuntu z Pythonem w wersji 3.10
- [x] 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem
- [x] 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)
- [x] 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle
- [x] 5.0 dodać konfigurację docker-compose

Dodatkowo:
- [x] pliki dockerfile
- [ ] link do dockerhub

## Zadanie 2 - Scala - Kontroler do produktów
Należy stworzyć aplikację na frameworku Play w Scali 3. 
- [ ] 3.0 Należy stworzyć kontroler do Produktów
- [ ] 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy
- [ ] 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD
- [ ] 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok
- [ ] 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD

Kontrolery mogą bazować na listach zamiast baz danych. CRUD: show all, show by id (get), update (put), delete (delete), add (post). 

## Zadanie 3 - Kotlin - przesyłanie wiadomości Discord
- [ ] 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord
- [ ] 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)
- [ ] 4.0 Zwróci listę kategorii na określone żądanie użytkownika
- [ ] 4.5 Zwróci listę produktów wg żądanej kategorii
- [ ] 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex