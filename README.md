# Mock Premier League Node.js Express API with TypeScript

![CircleCI branch](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser/master.svg?style=flat-square)
![npm](https://img.shields.io/npm/dm/localeval.svg?style=flat-square)
![Plugin on redmine.org](https://img.shields.io/redmine/plugin/stars/redmine_xlsx_format_issue_exporter.svg?style=flat-square)
![onix](https://img.shields.io/badge/onix-systems-blue.svg)

> Node.js Express API with TypeScript 3. Supports MongoDB

## Description

A project to mock premier league.

### Project Introduction

- suppot ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Docker container

## Features

##### Authentication:

- jwt authentication

##### Session Storage:

- MongoDB
- Redis

##### Integration testing

- jest
- chai
- supertest

## Requirements

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

## Installation

Clone the project, navigate to the root directory and run npm istall

```bash
git clone <url>
cd <folderName>
npm install
```

## Running the API

### Development

To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:

```
nodemon
```

### Testing

To run unit tests:

```bash
npm t
```

To run integration tests:

```bash
npm test
```

## Postman

Postman API documentation is available on route:

```bash
https://documenter.getpostman.com/view/949328/SVYwLx26?version=latest
```

## Swagger

```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```

Swagger documentation will be available on route:

```bash
http://localhost:3000/docs
```

## Hosted URL

```bash
https://ebos12-mock-premier-league.herokuapp.com/
```
