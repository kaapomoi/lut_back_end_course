# lut_back_end_course

Repository containing course exercises and final project

# Running the project

Clone this repository

```
git clone https://github.com/kaapomoi/lut_back_end_course.git
```

Install node if you haven't already. https://nodejs.org/en/
Install mongodb as a service if you haven't already. https://www.mongodb.com/

Install npm packages:

```
cd lut_back_end_course/project
npm i
```

Run the project:

```
npm run start
```

The server should be on http://localhost:3000, to which you can now send API requests. Some requests require a json object body containing player or match data. Requests can be made with [Postman](https://www.postman.com/) for example.

```
// Get all players
GET http://localhost:3000/sbmm/players/

// Get all matches
GET http://localhost:3000/sbmm/matches/

// Get one player (ex. id == 2)
GET http://localhost:3000/sbmm/players/2

// Delete one player (ex. id == 2)
DELETE http://localhost:3000/sbmm/players/2

// Add one player, needs json body in request
POST http://localhost:3000/sbmm/players/
{
    "id": 1,
    "name": "Player example",
    "wins": 0,
    "losses": 0,
    "mmr": 1000,
    "skill": 0.478
}

// Update one player, needs json body in request
PATCH http://localhost:3000/sbmm/players/
{
    "name": "Player updated name",
    "wins": 0,
    "losses": 0,
    "skill": 0.746
}

// Simulate a game between two players, this calculates a winner based on their skill, updates their mmr, wins, losses
POST http://localhost:3000/sbmm/matches/
{
    "id1": 4,
    "id2": 16
}
```
