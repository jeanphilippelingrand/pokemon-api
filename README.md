<p align="center">An <a href="http://nodejs.org" target="_blank">Node.js</a>  backend application to handle Pokemons</p>
    <p align="center">

## Description
Small API Restful application exposing CRUD operations for Pokemons management.

### Features
- CRUD Operations such as Create, Delete one, Get one, Update one, Get all. (full documentaion [above](### Rest api documentation))
- Swagger documentation available at <i>/api</i>
- At startup, the application loads the data contained into [this file](./pokemons.csv)

### Rest api documentation
Multiple ways to discover the API:
- [An OpenAPI spec](./swagger.json)
- [Postman collection](./Pokemon.postman_collection.json)
- When this appication is launched, it exposes a swagger UI at /api

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

