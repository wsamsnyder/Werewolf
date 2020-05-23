This repo will one day be the interface for the game Werewolf that is usually played during Hack Reactor's Social Hack Night.

## This Repo uses the `dotenv` library
#### Add a `.env` file to the root directory with the following information

Variable | Suggested Default
---------|-----------
SERVER_PORT | 4000


## How to use

Command | Result
----------|---------
`npm run dev:build` | Builds bundle, watching, in developement mode
`npm run dev:start` | Starts the server with nodemon
`npm run build` | Build bundle in production mode
`npm run start` | Starts the server with node