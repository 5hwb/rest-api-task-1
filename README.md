# REST API Task 1

Implementation of a REST API for a hypothetical spacecraft logistics system.

## Required tools

* Node.js
* Node Package Manager (NPM)
* `curl` command line utility

## Setup

1. Install the Nodemon, Express and Typescript packages by running the following commands in the terminal:

```
npm install --save-dev nodemon
npm install --save express
npm install --save-dev typescript
npm install --save-dev @types/node @types/express @types/react
npm install --save-dev jest supertest
```
2. Compile the TypeScript with `npx tsc`.

## How to run the API server

1. Open a terminal and run `npm run start` to start the server.
2. Before executing PUT or POST requests, set the header 'Content-Type' to 'applications/json' to ensure the response body is formatted properly.

## Usage

### Add sample locations and spaceships

To experiment with the REST API, run `add_sample_data.sh` in the terminal to add sample locations and spaceships.

### Get all spaceships

```bash
curl -X GET -H 'Content-Type: application/json' -i http://localhost:3000/spaceships
```

### Update a spaceship

* Set the spaceship with an ID of 1 to operational status: `curl -X POST -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/update/1 --data '{"id": 1, "status": "operational"}'`