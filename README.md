# Werewolf
Werewolf is a game that pits Villagers against each other as they must eradicate the Wolves from the town before the Wolves become the majority and take over the town! Once loaded, you can choose to start a new game, with you being the Moderator, or you can join an existing game with the Game ID. All of the Townspeople automatically join the Town chat. Once assigned, each Role will be joined into a chat with the Moderator. Each day/night cycle is tracked by a timer on the server and can be adjusted by the Moderator. When the time comes, the townspeople can vote to remove another townsperson, which is tracked and available for all to see in the Voting History window.

## This Repo uses the `dotenv` library
#### Add a `.env` file to the root directory with the following information

Variable | Suggested Default
---------|-----------
SERVER_PORT | 4000


## How to Use

Command | Result
----------|---------
`npm run dev:build` | Builds bundle, watching, in developement mode
`npm run dev:start` | Starts the server with nodemon
`npm run build` | Build bundle in production mode
`npm run start` | Starts the server with node

## Technology Used
* Node.js w/ Express
* Socket.io
* MongoDB w/Mongoose
* React w/Hooks
* Styled Components
* Webpack