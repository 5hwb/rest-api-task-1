# REST API Task 1

Implementation of a REST API for a hypothetical spacecraft logistics system.

## TODOs

* Implement the location.
* Convert all JS files to TypeScript.

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
npm install --save-dev @types/node @types/react
```
2. Compile the TypeScript with `npx tsc`.

## How to run the API server

1. Open a terminal and run `npm run start` to start the server.
2. Before executing PUT or POST requests, set the header 'Content-Type' to 'applications/json' to ensure the response body is formatted properly.

## Usage

### Add sample spaceships

Run `add_sample_data.sh` in the terminal.

### Get all spaceships

```bash
curl -X GET -H 'Content-Type: application/json' -i http://localhost:3000/spaceships
```

### Update a spaceship

```bash
curl -X POST -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/update/1 --data '{"id": 1, "name": "Best Spacecraft One", "model": "Qwertytron 9000"}'
```
