_Lappeenrannan teknillinen yliopisto_
_School of Business and Management_

### Software Development Skills

##### Kaapo Moilanen 51944

##### LEARNING DIARY, Back End MODULE

#### 07.06.2021

I set up a git repository and read the instructions for completing the course. I chose VS Code as my editor since I have used it before and have it set up with all the extensions. I watched the REST Intro video and learned what REST APIs are and how to use them.

I already had NodeJS installed, so I started writing the code right away. I followed the tutorial, but when I went to test the final product, it gave me an error in the inspector: "the character encoding of the plain text document was not declared.". JS being the shit language it is, couldn't tell me what's actually wrong. After scouring the web for solutions and not finding any that work, I just copied the source code from the tutorials repository and sure enough it worked, meaning I must've mis-typed something.

Next up was mongodb. I installed it as a service and added mongo to my path. I followed the tutorial and saved the commands into a text file for later reference. I learned how to insert, update and query data from the database.

#### 08.06.2021

I followed the express crash course tutorial and learned new concepts like rendering pages from templates, implementation of an API with express and node.js

I followed the REST example project tutorial and learned how to combine the previously taught concepts into a project.

#### 12.06.2021

Starting the final project, I'm thinking about making a matchmaking thing where the API takes in two players ids and simulates a 1v1 game, where the winner is determined by their 'skill', updates the players' stats.

The user should be able to:

- get player data
- get played matches
- simulate a game (send 2 ids to server)

Database structure:

players:
| id | name | wins | losses | mmr | real_skill |
| -- |------ | ---:|------:|----:|----------: |
| $oid| simon| 12 | 3 | 1400 | 0.8 |
| $oid| eddy | 2 | 13 | 800 | 0.2 |

matches:
| p1_id | p2_id | result |
|-------|-------|-------:|
| $oid | $oid | 1 |
