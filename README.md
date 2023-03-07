<p align="center">An <a href="http://nodejs.org" target="_blank">Node.js</a>  backend application to handle Pokemons</p>
    <p align="center">

## Description
Small API Restful application exposing CRUD operations for Pokemons management. It uses [NestJS](https://docs.nestjs.com/) with [Prisma](https://www.prisma.io/) as ORM, [SQLite](https://www.sqlite.org/index.html) as database and [Railway](https://railway.app/) as CICD.

### Features
- CRUD Operations for pokemon management
- Swagger UI documentation of the API
- Automatic seeding of the database at startup
- CICD using [Railway](https://railway.app/)

### Rest api documentation
Multiple ways to discover the API:
- [An OpenAPI spec](./swagger.json)
- [Postman collection](./Pokemon.postman_collection.json) which uses variables to change the server base url
- When this appication is launched, it exposes a swagger UI at `/documentation`

### Technical decision
#### Database
DB structure is defined in the [prisma schema](./prisma/schema.prisma) and in the [initial db migration](./prisma/migrations/20230307132605_initial_migration/)
- SQLite has been chosen in the context of this application to allow the reviewer an easy setup. Prisma offers a quick way to change the database technology.
- The usage of an ORM can be discussed, it has his set of pros (speed up dev for simple requests, allow switching between technologies easily, offers model typescript types) and cons (it tempts developers to use ORM references within the business layer)
- The DB structure is flat and there's no usage of relational features. However we see that `Type 1` and `Type 2` are using the same strings. This decision is mainly done to simplify the development (The creation of another table, PokemonType, would imply the creation of another API) and to allow the API consumer to create Pokemons with new types without explicitly having to create a new type.

#### Node Framework
NestJS allows the quick generation of server applications using typescript with a bunch of features (start, start dev, start prod, testing, linting, etc.) but also [CRUD operations generation](https://docs.nestjs.com/recipes/crud-generator) which has been used in this project.

#### Folder structure
NestJS boilerplate offers the proposed structure, grouping controllers, services and other files of the same domain together. Another approach grouping controllers, services and other files by file type would also be valid.

#### Testing
- Note that there are two types of testing in the project. e2e tests are in the [test folder](./test/app.e2e-spec.ts) and unit tests.
- Unit tests are located along the src files. This offers quick access for the developers but can make the folders overwhelmed by files. This could be discuss. 

## Improvements
Inline `//TODO` have been written within the code. Here some other improvements:
- There is no repository layers, the service layer has some prisma references. Ideally the prisma references would be encapsulated within a repository layer. So the service has no reference to the db technology. Also, there is no proper application model definition, prisma types are used along the application.
- The application could be dockerized to be portable to any deployment platform.

## Installation
- Node is a prerequesite to install the project locally.
- The application needs the db to be setup. Migrations are available and can be run using `npx prisma migrate dev`.

```bash
$ yarn install
```

## Running the app

```bash
# development
# To setup the db
$ npx prisma migrate dev
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

## Formating
```bash
# unit tests
$ yarn run lint

```

