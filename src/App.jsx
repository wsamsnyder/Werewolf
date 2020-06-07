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
  const [controlSocketIdentity, setControlSocketIdentity] = useState('');
  const [moderator, setModerator] = useState(false);
  const [username, setUsername] = useState('');
  // let room;

  // make a new room with the namespace of the id returned
  const createGameRoom = (newUsername) => {
    api.createGameRoom(newUsername)
      .then(({ gameId, townChat, otherChats }) => {
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
        const { townId, townName } = townChat;
        setTown({
          roomId: townId,
          username: newUsername,
          userId: townId,
          gameId,
          roomName: townName,
        });
        setUsername(newUsername);
        setModerator(true);
        setChatSockets(rooms);
        setRoom(gameId);
      });
  };

  const joinGameRoom = (newUsername, roomId) => {
    // send user information to the server
    api.joinGameRoom(newUsername, roomId)
      .then(({ townRoomId, townsPersonId, controlSocketId }) => {
        setTown({
          roomId: townRoomId,
          username: newUsername,
          userId: townsPersonId,
          gameId: roomId,
          roomName: 'townsPeople',
        });
        setUsername(newUsername);
        setControlSocketIdentity(controlSocketId);
        setRoom(roomId);
      });
  };

  const roleAssignmentCb = ({ roomName, userId, roomId }) => {
    const roleChat = {
      username,
      roomName,
      userId,
      roomId,
      gameId: room,
    };

    setChatSockets([roleChat]);
  };

  const render = (roomToJoin) => {
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
          controlSocketIdentity={controlSocketIdentity}
          connection={room}
          moderator={moderator}
          roleAssignmentCb={roleAssignmentCb}
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
