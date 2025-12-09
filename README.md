# E-garderoba

Aplikacja webowa mająca na celu ułatwienie procesu rejestracji przez kierownika zespołu tanecznego wypożyczeń strojów lub wybranych elementów przez tancerzy.

## Funkcjonalności

- rejestracja i logowanie użytkowników
- zarządzanie elementami garderoby
- rejestracja wypożyczeń elementów garderoby

[Szczegółowy opis w formie "user stories"](./concept/user-stories.md)

## Technologie

**Frontend**  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React%20Bootstrap-563D7C?style=flat&logo=react-bootstrap&logoColor=white)  
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=flat&logo=testing-library&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-007ACC?style=flat&logo=typeorm&logoColor=white)  
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=flat&logo=jest&logoColor=white)

**Baza danych**  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

**Konteneryzacja i orkiestracja**  
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

**CI/CD**  
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

**Dokumentacja**  
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)

**Narzędzia developerskie**  
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)

## Wymagania wstępne

Aby uruchomić aplikację musisz mieć zainstalowane:

- [Git](https://git-scm.com/) – do pobrania repozytorium
- [Docker](https://docs.docker.com/get-docker/) i [Docker Compose](https://docs.docker.com/compose/) – jeśli chcesz uruchomić usługi (frontend, backend lub bazę danych) w kontenerach Docker
- [Node.js](https://nodejs.org/en/download/) (24.x LTS) – jeśli chcesz uruchomić backend lokalnie (bez Dockera)
- [PostgreSQL](https://www.postgresql.org/download/) – jeśli chcesz uruchomić bazę danych lokalnie (bez Dockera)

## Instalacja i uruchomienie

### Pobranie repozytorium

Utwórz katalog projektu i pobierz repozytorium z GitHub:

```bash
mkdir e_garderoba
cd e_garderoba
git clone https://github.com/micang7/e_garderoba.git .
```

---

### Konfiguracja środowiska

Aby aplikacja się uruchomiła, w katalogach `/frontend` i `/backend` wymagane są pliki konfiguracyjne **`.env`**.
Pliki `.env.example` zawierają przykładową konfigurację wystarczającą do uruchomienia aplikacji lokalnie w trybie developerskim/testowym. Wystarczy je skopiować nadając odpowiednią nazwę:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

> ⚠️ **Uwaga:** W środowisku produkcyjnym należy uzupełnić konfigurację własnymi wartościami.

---

### Uruchomienie aplikacji w środowisku Docker

Zbuduj i uruchom wszystkie usługi (frontend, backend, baza danych) w kontenerach Docker:

```bash
docker compose up -d
```

### Dostępne usługi

Po uruchomieniu aplikacji, na hoście (np. w przeglądarce, Postman lub pgAdmin) dostępne są usługi:

**Frontend**: [http://localhost:5173](http://localhost:5173)  
**Backend**: [http://localhost:3000](http://localhost:3000)  
**Baza danych**: `localhost:5432`

**Dokumentacja API**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

### Uruchomienie tylko wybranych usług w kontenerach Docker

Aby zbudować i uruchomić wybraną usługę w kontenerze Docker, podaj jej nazwę (`frontend`, `backend` lub `db`):

```bash
docker compose up -d <usługa>
```

> ⚠️ **Uwaga:** W zależności od sposobu uruchomienia backendu i bazy danych, w pliku **`/backend/.env`** powinna być odpowiednio ustawiona wartość zmiennej `POSTGRES_HOST` (zgodnie z tabelą poniżej), ze względu na różnice w komunikacji backendu z bazą danych.

| Backend  | Baza danych     | `POSTGRES_HOST`        |
| -------- | --------------- | ---------------------- |
| Docker   | Docker          | `db` (domyślnie)       |
| Docker   | lokalnie        | `host.docker.internal` |
| lokalnie | Docker/lokalnie | `localhost`            |

---

### Uruchomienie usług lokalnie

#### Frontend

```bash
cd frontend
npm install
npm run start:dev
```

[Szczegóły uruchamiania i testowania frontendu](./frontend/README.md)

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

Pamiętaj, żeby w pliku **`/backend/.env`** ustawić odpowiednio wartość zmiennej `POSTGRES_HOST` ([patrz tabela wyżej](#uruchomienie-tylko-wybranych-usług-w-kontenerach-docker)).

> ⚠️ **Uwaga:** Aby uruchomić backend lokalnie musisz mieć zainstalowane [Node.js](https://nodejs.org/en/download/) (24.x LTS).

[Szczegóły uruchamiania i testowania backendu](./backend/README.md)

#### Baza danych

Wystarczy w pliku **`/backend/.env`** ustawić odpowiednio wartość zmiennej `POSTGRES_HOST` ([patrz tabela wyżej](#uruchomienie-tylko-wybranych-usług-w-kontenerach-docker)).

Jeśli lokalna baza danych działa na innym porcie niż domyślny `5432`, zmodyfikuj również zmienną `POSTGRES_PORT`.

> ⚠️ **Uwaga:** Aby korzystać z lokalnej bazy danych musisz mieć zainstalowane [PostgreSQL](https://www.postgresql.org/download/).

## Założenia projektowe

[Model danych](./concept/db-erd.png)  
[Kontrakt API](./concept/api.md)  
[Makiety UI](./concept/mockups.md)
