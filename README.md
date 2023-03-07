<p align="center">An <a href="http://nodejs.org" target="_blank">Node.js</a>  backend application to handle Pokemons</p>
    <p align="center">

## Description
Small API Restful application exposing CRUD operations for Pokemons management. It uses [NestJS](https://docs.nestjs.com/) with [Prisma](https://www.prisma.io/) as ORM. The db used is sqlite to allow fast local setup.

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
Node is a prerequesite to install the project locally.

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

## Improvements
Here some of the things that are missing on this project
- The database is an sqlite db which doesnt allow data persistency between deployments (online db), a postgresdb or other databases can easily be added using prisma
- There is no repository layers, the service layer has some prisma references. Ideally the prisma references would be encapsulated within a repository layer. So the service has no reference to the db technology