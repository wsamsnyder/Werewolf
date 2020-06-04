import React, { useState } from 'react';
import styled from 'styled-components';

import { api } from './lib';
import ChatRoom from './chats/ChatRoom';
import Login from './Login';
import CommandConsole from './controlPanel/CommandConsole';

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
  // const [commandRoom, setCommandRoom] = useState('');
  const [moderator, setModerator] = useState(false);

  let username;
  // let room;

  // make a new room with the namespace of the id returned
  const createGameRoom = (newUsername) => {
    username = newUsername;
    // room = gameId;
    api.createGameRoom(username)
      .then(({ gameId, townChat, otherChats }) => {
        // room = gameId;
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
        const { townId, townName } = townChat;
        setTown({
          roomId: townId,
          username,
          userId: townId,
          gameId,
          roomName: townName,
        });
        setModerator(true);
        setChatSockets(rooms);
        setRoom(gameId);
      });
  };

  const joinGameRoom = (newUsername, roomId) => {
    username = newUsername;
    // room = roomId;

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

  const render = (roomToJoin) => {
    console.log(room);
    if (!roomToJoin) {
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
        <CommandConsole
          connection={room}
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
      {render(room)}
    </MainDiv>
  );
};

export default App;
