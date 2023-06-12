# chat-app

Główne funkcje aplikacji:
- Tworzenie kont uzytkowników 
- Zarządzanie kontem 
  - Edycja:
    - hasła
    - koloru avatara
    - adresu email
    - nazwy użytkownika
  - usuwanie konta
- Odzyskiwanie konta za pomocą unikalnego klucza odzyskiwania (kod jest wysylany na adres email przy procesie odzyskiwania)
- Wysyłanie powiadomien email
- Tworzenie chat room'ów 
- Dołączanie do chat room'ów za pomocą unkalnego kodu dostępowego (uzyskanego po uwtorzeniu chatu)
- Komunikacja użytkowników na chacie w czasie rzeczywistym

Wykorzystane framework'i:
- NodeJS
- ReactJS

Baza danych:
- MongoDB (biblioteka 'mongoose' NodeJS)

Biblioteki po stronie serwera:
- bcrypt (haszowanie haseł oraz kluczy)
- cors (integracja pomiędzy klientem a serwerem)
- crypto-js (genererowanie unikalnych kluczy)
- dotenv (pliki konfiguracyjne serwera)
- generate-password (generator haseł)
- nodemailer (obsługa poczty, wysyłanie powiadomień oraz kluczy)
- socket.io (komunikacja z serwerem w czasie rzeczywistym (podstawka to tworzenia aplikacji czatu))
- express (RESTful API)

Bibliotego po stronie klienta:
- MaterialUI (komponenty oraz style UI)
- universal-cookie (przechowywanie klucza sesji)
- axios (realizacja zapytań API)
- formik (walidator formularzy)
- moment (konwerter daty i czasu)
- socket.io-client (komunikacja klienta z serwerem w czasie rzeczywistym)




Chat application based on ReactJS and NodeJS
