# 🎞️ Movie Rental Store API

🇧🇷 Projeto backend desenvolvido com Node.js e Express para uma locadora de filmes fictícia. Este projeto visa fornecer a API necessária para o gerenciamento e aluguel de mídias físicas de filmes online.

🇺🇸 Backend project developed with Node.js and Express for a fictional movie rental store. This project aims to provide the necessary API for managing and renting physical movie media online.

## Run Locally

#### Clone the project

```bash
  git clone git@github.com:carinavbritto/movies-rental-api.git
```

#### Go to the project directory

```bash
  cd movies-rental-api
```

#### Install dependencies

```bash
  npm install
```

#### Start a dev server

```bash
  node src/index.js
```

Navigate to http://localhost:3000

## API Reference

#### Get all movies

```http
    GET /api/movies
```

#### Reserve a movie

```http
  POST /api/movies/reserve
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `movieId` | `string` | **Required**. Id of the movie to reserve |

#### Confirm the lease of a reserved movie

```http
  POST /api/movies/lease
```

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `reserveId` | `string` | **Required**. Id of the reservation |
| `customer`  | `object	` | **Required**. Customer information  |

#### Return a leased movie

```http
  POST /api/movies/return
```

| Parameter    | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `scheduleId` | `string` | **Required**. Id of the lease schedule |

#### Register a new employee

```http
  POST /api/employees/register
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Username of user |
| `password` | `string` | **Required**. Password of user |

#### Login a employee

```http
  POST /api/employees/register
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Username of user |
| `password` | `string` | **Required**. Password of user |

#### Create a new movie

```http
  POST /api/movies
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `name`     | `string` | **Required**. Name of the movie     |
| `synopsis` | `string` | **Required**. Synopsis of the movie |
| `rating`   | `string` | **Required**. Rating of the movie   |
| `status`   | `string` | **Required**. Status of the movie   |

#### Update a movie

```http
  PUT /api/movies/${id}
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `name`     | `string` | **Required**. Name of the movie     |
| `synopsis` | `string` | **Required**. Synopsis of the movie |
| `rating`   | `string` | **Required**. Rating of the movie   |
| `status`   | `string` | **Required**. Status of the movie   |

#### Delete a movie

```http
  DELETE /api/movies/${id}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of the movie to delete |

## Docker

#### Prerequisites

Docker installed on your machine. [Docker installation instructions](https://docs.docker.com/get-docker/)

#### Build

Run `docker-compose build` to build the docker container.

#### Run

Run `docker-compose up` to run the docker container.

#### Stop

Run `docker-compose down` to stop the docker container.

## Tech Stack

**Server:** [ExpressJs (version 4.19.2)](https://expressjs.com/) e [NodeJs (version 20.16.0)](https://nodejs.org/en)

**Database:** [MongoDB](https://www.mongodb.com/)

**Containers:**
[Docker](https://www.docker.com/)

**Authentication:**
[JWT (JSON Web Tokens)](https://jwt.io/)
