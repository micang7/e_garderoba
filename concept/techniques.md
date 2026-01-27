[< Powrót do README.md](../README.md#założenia-projektowe)

# Zrealizowane techniki oraz dobre praktyki

### Autoryzacja przy użyciu tokena JWT

Po udanym logowaniu użytkownik otrzymuje token **JSON Web Token (JWT)**, w którym zakodowane są informacje o jego identyfikatorze oraz przypisanej roli.

- **Bezpieczeństwo**: Chronione endpointy API wymagają przesłania tokena w nagłówku `Authorization` typu `Bearer`.
- **Kontrola dostępu**: Backend weryfikuje uprawnienia na poziomie kontrolerów, ograniczając dostęp do wrażliwych akcji wyłącznie dla użytkowników z odpowiednią rolą.

### Ujednolicony format odpowiedzi JSON

Wszystkie odpowiedzi z API posiadają stałą strukturę, co ułatwia ich przetwarzanie po stronie frontendu:

- **`data`**: Zawiera właściwe dane wynikowe.
- **`meta`**: Dodatkowe informacje (łączna liczba rekordów, jeśli data zawiera listę obiektów, przydatna do paginacji).
- **`error`**: Czytelny komunikat błędu (w przypadku niepowodzenia).
- **`validationErrors`**: Tablica obiektów zawierająca szczegółowe błędy walidacji poszczególnych pól formularza.

### Usystematyzowany zestaw kodów błędów walidacji

Błędy walidacji są zwracane w postaci unikalnych kodów (np. `INVALID_FORMAT`).

- Pozwala to na łatwe mapowanie błędów na wielojęzyczne komunikaty po stronie frontendu.
- Mimo wszystko kodom towarzyszą domyślne komunikaty w języku angielskim możliwe do użycia przez frontend.

### Testy jednostkowe i end-to-end (E2E)

Zastosowano dwupoziomowe podejście do testowania:

- **Testy jednostkowe**: Weryfikacja logiki biznesowej, w tym uprawnień użytkowników (usługi użytkownika) przy użyciu **Jest** z pełnym mockowaniem warstwy bazy danych.
- **Testy E2E**: Symulacja realnych scenariuszy użytkownika. Wykorzystano dedykowaną, odizolowaną bazę danych testową (`db_test`), co pozwala na bezpieczne przeprowadzanie testów bez wpływu na dane deweloperskie.

### Atomic Design

Struktura komponentów frontendowych opiera się na metodologii **Atomic Design**:

1. **Atomy**: Podstawowe elementy HTML (przyciski, inputy).
2. **Molekuły**: Grupy atomów tworzące proste funkcjonalności (np. pole wyszukiwania wraz z etykietą).
3. **Organizmy**: Złożone sekcje interfejsu (np. tabela danych).
4. **Szablony i Strony**: Układy graficzne wypełnione konkretną logiką i danymi.

### Środowiska projektowe

Zarządzanie konfiguracją odbywa się poprzez pliki `.env.{MODE}.local`.

- **Development**: Konfiguracja pod lokalne bazy danych i narzędzia deweloperskie.
- **Test**: Specyficzne ustawienia dla środowiska testowego (np. parametry bazy `db_test`), zapewniające powtarzalność wyników testów.

### Serwisy i hooki (React Query) do pozyskiwania danych z API

Architektura komunikacji z API została oparta o warstwę abstrakcji:

- **Axios Interceptors**: Automatyczne dołączanie tokena JWT do każdego zapytania oraz centralna obsługa błędów ogólnych (np. przekierowanie do logowania przy błędzie `401 Unauthorized`).
- **Custom Hooks (React Query)**: Zarządzanie stanem asynchronicznym, cache’owaniem danych oraz stanami ładowania (`isLoading`) i błędów, co znacząco poprawia wydajność aplikacji i UX.

### Automatyzacja CI/CD (GitHub Actions)

W projekcie skonfigurowano potok **Continuous Integration (CI)**, który automatycznie weryfikuje każdą zmianę wprowadzaną do repozytorium (Push/Pull Request):

- **Wielopoziomowa weryfikacja**: Pipeline obejmuje analizę statyczną kodu (`Lint`), sprawdzanie formatowania (`Prettier`) oraz testy jednostkowe.
- **Testy E2E w izolacji**: Dla kluczowych gałęzi (`develop`, `main`) automatycznie podnoszona jest usługa PostgreSQL w kontenerze, aby przeprowadzić testy integracyjne.
- **Weryfikacja Docker**: Ostatnim etapem jest próbne budowanie obrazu Docker (`docker-build`), co gwarantuje poprawność konfiguracji konteneryzacji przed wdrożeniem.

### Interaktywna dokumentacja API (Swagger/OpenAPI)

Backend posiada automatycznie generowaną dokumentację **Swagger UI**, która służy jako "żywy" kontrakt między serwerem a klientem:

- **Pełna typizacja**: Każdy endpoint precyzyjnie określa typy zwracanych danych oraz możliwe błędy (np. `400 Bad Request` dla błędów walidacji).
- **Testowanie endpointów**: Możliwość testowania zapytań bezpośrednio z przeglądarki po podpięciu tokena JWT.
