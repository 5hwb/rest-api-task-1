#!/usr/bin/env bash
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 1, "name": "Galactic Superstar 1", "model": "Qwertytron 9000"}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 2, "name": "Outer Space Maestro 2", "model": "Qwertytron 7000"}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 3, "name": "Pluto 3", "model": "Jikolptech 300"}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 4, "name": "Conqueror of Saturn 4", "model": "Qwertytron 9000"}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 5, "name": "SpaceShip Five", "model": "Jikolptech 500"}'

curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 1, "cityName": "Redsand", "planetName": "Mars", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 2, "cityName": "Gaswhirl", "planetName": "Jupiter", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 3, "cityName": "Ringville", "planetName": "Saturn", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 4, "cityName": "Bigpressure", "planetName": "Venus", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 5, "cityName": "Bluecold", "planetName": "Neptune", "capacity": 2}'
