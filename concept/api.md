[< Powrót do README.md](../README.md#założenia-projektowe)

# Kontrakt API

## Autentykacja i autoryzacja

- **Klucz API** - nagłówek: "x-api-key"
- **JWT** - nagłówek: "Authorization"

## Endpointy

### /auth

- POST /login
- POST /refresh
- POST /reset-password

### /users

- POST /
- GET /
- GET /:id
- PATCH /:id
- DELETE /:id
- GET /:id/events

### /items

- POST /
- GET /
- GET /:id
- PATCH /:id
- DELETE /:id
- GET /:id/events
- GET /:id/costumes

### /costumes

- POST /
- GET /
- GET /:id
- PATCH /:id
- DELETE /:id
- GET /:id/items

### /events

- POST /rental
- POST /loss
- POST /return
- GET /
- GET /:id
- DELETE /:id

## Parametry zapytań typu findAll

- offset=`<offset>`
- limit=`<limit>`
- sort=`<nazwa_pola>`
- order=`asc` | `desc`
- `<nazwa_filtrującego_pola>`=`<wartość>`
- fromDate/toDate=`<mm.dd.rrrr>` (jeśli tabela zawiera daty)

## Format odpowiedzi JSON

**Sukces**

```json
{
  "data": "object | array",

  // only if data is array
  "meta": {
    "total": "number"
  }
}
```

Przykłady:

- GET /api/users

```json
{
  "data": [
    {
      "id": 1,
      "name": "John"
    },
    {
      "id": 2,
      "name": "Joe"
    }
  ],
  "meta": {
    "total": 2
  }
}
```

- GET /api/items/1

```json
{
  "data": {
    "id": 1,
    "name": "Shirt"
  }
}
```

**Błąd**

```json
{
  // human readable error message
  "error": "string",

  // only if validation errors
  "validationErrors": [
    {
      "field": "string",
      "code": "string",
      "message": "string"
    }
  ]
}
```

Przykłady:

- POST /api/users

```json
{
  "error": "Email already exists"
}
```

- POST /api/users

```json
{
  "error": "Validation errors",
  "validationErrors": [
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "The value has invalid format"
    }
  ]
}
```

## Wykorzystywane kody HTTP

### Sukces

**200 (OK)**  
**201 (Created)**  
**204 (No content)**

### Błąd

**400 (Bad Request)**  
**401 (Unauthorized)**  
**403 (Forbidden)**  
**404 (Not Found)**  
**409 (Conflict)**  
**422 (Unprocessable Entity)**  
**500 (Internal Server Error)**
