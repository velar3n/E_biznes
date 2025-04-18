### Autor: Natalia Kiełbasa

# E-biznes - zadania

## Zadanie 1 - Docker - Hello World - [link](https://github.com/velar3n/E_biznes/tree/main/zad_1)
- [x] 3.0 obraz ubuntu z Pythonem w wersji 3.10 - [Commit link](https://github.com/velar3n/E_biznes/commit/bebb102ae6a43852b67fdc92711f5201810da221)
- [x] 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem - [Commit link](https://github.com/velar3n/E_biznes/commit/cd1b62ac3aa93c2ffe6cdf3d812efe6d33a38741)
- [x] 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle) - [Commit link](https://github.com/velar3n/E_biznes/commit/cd1b62ac3aa93c2ffe6cdf3d812efe6d33a38741)
- [x] 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle - [Commit link](https://github.com/velar3n/E_biznes/commit/a1ab8944d09e15742b431c2d0bfb00f304b96aae)
- [x] 5.0 dodać konfigurację docker-compose - [Commit link](https://github.com/velar3n/E_biznes/commit/a1ab8944d09e15742b431c2d0bfb00f304b96aae)

Dodatkowo:
- [x] pliki dockerfile
- [x] link do dockerhub

## Zadanie 2 - Scala - Kontroler do produktów - [link](https://github.com/velar3n/E_biznes/tree/main/zad_2)
Należy stworzyć aplikację na frameworku Play w Scali 3.
- [x] 3.0 Należy stworzyć kontroler do Produktów - [Commit link](https://github.com/velar3n/E_biznes/commit/0fed769d043e9755111b4f69dd73d37aa1a01d99)
- [x] 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy - [Commit link](https://github.com/velar3n/E_biznes/commit/0fed769d043e9755111b4f69dd73d37aa1a01d99)
- [x] 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD - [Commit link](https://github.com/velar3n/E_biznes/commit/77cecc8cf4a97c438b5234b80078d9517401a286)
- [x] 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok - [Commit link](https://github.com/velar3n/E_biznes/commit/8b2f8b7eb95589840ba4af885b251ed1c53c0654)
- [x] 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD - [Commit link](https://github.com/velar3n/E_biznes/commit/2b2d1c06f00a97296c3e55c7e150c5e351aa44f9)

Kontrolery mogą bazować na listach zamiast baz danych. CRUD: show all, show by id (get), update (put), delete (delete), add (post). 

## Zadanie 3 - Kotlin - przesyłanie wiadomości Discord - [link](https://github.com/velar3n/E_biznes/tree/main/zad_3)
- [x] 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord - [Commit link](https://github.com/velar3n/E_biznes/commit/26b7573445c79ecb60bb911d03789c44f7912f02)
- [x] 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) - [Commit link](https://github.com/velar3n/E_biznes/commit/26b7573445c79ecb60bb911d03789c44f7912f02)
- [x] 4.0 Zwróci listę kategorii na określone żądanie użytkownika - [Commit link](https://github.com/velar3n/E_biznes/commit/26b7573445c79ecb60bb911d03789c44f7912f02)
- [x] 4.5 Zwróci listę produktów wg żądanej kategorii - [Commit link](https://github.com/velar3n/E_biznes/commit/26b7573445c79ecb60bb911d03789c44f7912f02)
- [ ] 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex