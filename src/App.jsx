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
  const [chatSockets, setChatSockets] = useState([]);
  const [room, setRoom] = useState('');
  const [moderator, setModerator] = useState(false);

  let username;

  // make a new room with the namespace of the id returned
  const createGameRoom = (newUsername) => {
    username = newUsername;
    api.createGameRoom(username)
      .then(({ gameId, townChat, otherChats }) => {
        setRoom(gameId);

        // connect to commandRoom

        const { townId, townName } = townChat;
        setTown({
          roomId: townId,
          username,
          userId: townId,
          gameId,
          roomName: townName,
        });
        // could push to state each time but only want to render when complete
        const rooms = [];
        otherChats.forEach(({ roomName, roomId }) => {
          rooms.push({
            roomId,
            username,
            userId: roomId,
            gameId,
            roomName,
          });
        });
        setModerator(true);
        setChatSockets(rooms);
      });
  };

  const joinGameRoom = (newUsername, roomId) => {
    username = newUsername;

    // send user information to the server
    api.joinGameRoom(newUsername, roomId)
      .then(({ townRoomId, townsPersonId }) => {
        setTown({
          roomId: townRoomId,
          username,
          userId: townsPersonId,
          gameId: roomId,
          roomName: 'townsPeople',
        });
        setRoom(roomId);
      });
  };

  const render = (townToJoin) => {
    if (!townToJoin) {
      return (
        <Login
          joinGameRoom={joinGameRoom}
          createGameRoom={createGameRoom}
        />
      );
    }
    // I think that this will take care of itself? is ChatSockets is empty, nothing will render
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
          chatSockets.map((roomData, idx) => (
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
      {render(town)}
    </MainDiv>
  );
};

export default App;
