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
      .then(({ gameId, chatRooms }) => {
        setRoom(gameId);
        console.log(chatRooms);
        // const townRoomName = chatRooms[0].roomName;
        let { roomId } = chatRooms[0];
        setTown({
          roomId: gameId,
          username: newUsername,
          userId: roomId,
          gameId,
          roomName: 'townsPeople',
        });
        // could push to state each time but component should only render once to avoid conflicts
        const rooms = [];
        for (let i = 1; i < chatRooms.length; i++) {
          const { roomName, roomId } = chatRooms[i];
          rooms.push({
            roomId,
            username: newUsername,
            userId: roomId,
            gameId,
            roomName,
          });
        }
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
