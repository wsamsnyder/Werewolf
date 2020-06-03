import React, { useState } from 'react';
import styled from 'styled-components';

import { api } from './lib';
import ChatRoom from './ChatRoom';
import Login from './Login';

const MainDiv = styled.div`
  display: grid;
  grid-template: 20px 1fr 2fr 1fr / 33% 33% 33%;
  grid-gap: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const GameId = styled.div`
  grid-column: 2;
  grid-row: 1;
  text-align: center;
`;

const App = () => {
  const [town, setTown] = useState('');
  const [sockets, setSockets] = useState([]);
  const [room, setRoom] = useState('');
  const [moderator, setModerator] = useState(false);
  const [username, setUsername] = useState('');

  // make a new room with the namespace of the id returned
  const createGameRoom = (newUsername) => {
    api.createGameRoom(newUsername)
      .then(({ gameId, townChat, otherChats }) => {
        setRoom(gameId);
        // connect to commandRoom

        const { townId, townName } = townChat;
        setTown({
          roomId: townId,
          username: newUsername,
          userId: townId,
          gameId,
          roomName: townName,
        });
        // could push to state each time but only want to render when complete
        const rooms = [];
        otherChats.forEach(({ roomName, roomId }) => {
          rooms.push({
            roomId,
            username: newUsername,
            userId: roomId,
            gameId,
            roomName,
          });
        });

        setUsername(newUsername);
        setModerator(true);
        setSockets(rooms);
      });
  };

  const joinGameRoom = (newUsername, roomId) => {
    // send user information to the server
    api.joinGameRoom(newUsername, roomId)
      .then((townsPersonId) => {
        setTown({
          roomId,
          username: newUsername,
          userId: townsPersonId,
          gameId: roomId,
          roomName: 'townsPeople',
        });
        setUsername(newUsername);
        console.log(townsPersonId);
      });
  };

  const render = (usernameIsEmtpy) => {
    if (!usernameIsEmtpy) {
      return (
        <Login
          joinGameRoom={joinGameRoom}
          createGameRoom={createGameRoom}
        />
      );
    }
    // I think that this will take care of itself? is sockets is empty, nothing will render
    // when one is added, it should render and if my conditionals are correct
    // it'll take the whole right side
    return (
      <MainDiv>
        <GameId>{room}</GameId>
        <ChatRoom
          location={-1}
          roomData={town}
          moderator={moderator}
        />
        {
          sockets.map((roomData, idx) => (
            <ChatRoom
              key={roomData.roomId}
              location={idx}
              roomData={roomData}
              moderator={moderator}
            />
          ))
        }
      </MainDiv>
    );
  };

  return (
    <MainDiv>
      {render(username)}
    </MainDiv>
  );
};

export default App;
