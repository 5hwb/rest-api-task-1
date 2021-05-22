#!/usr/bin/env bash
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 1, "cityName": "Tinyroast", "planetName": "Mercury", "capacity": 1}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 2, "cityName": "Bigpressure", "planetName": "Venus", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 3, "cityName": "Motherland", "planetName": "Earth", "capacity": 20}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 4, "cityName": "Redsand", "planetName": "Mars", "capacity": 5}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 5, "cityName": "Gaswhirl", "planetName": "Jupiter", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 6, "cityName": "Ringville", "planetName": "Saturn", "capacity": 2}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 7, "cityName": "Lightcold", "planetName": "Uranus", "capacity": 1}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 8, "cityName": "Bluecold", "planetName": "Neptune", "capacity": 1}'

curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 1, "name": "Galactic Superstar 1", "model": "Qwertytron 9000", "currentLocationId": 3}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 2, "name": "Outer Space Maestro 2", "model": "Qwertytron 7000", "currentLocationId": 7}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 3, "name": "Pluto 3", "model": "Jikolptech 300", "currentLocationId": 8}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 4, "name": "Conqueror of Saturn 4", "model": "Qwertytron 9000", "currentLocationId": 6}'
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 5, "name": "SpaceShip Five", "model": "Jikolptech 500", "currentLocationId": 3}'

