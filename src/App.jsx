import React, { useState } from 'react';
import styled from 'styled-components';

// import Socket from './sockets';
import { api } from './lib';
import ChatRoom from './ChatRoom';

const MainDiv = styled.div`
  display: grid;
  grid-template: 1fr 2fr 1fr / 33% 33% 33%;
  grid-gap: 20px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SplashScreenDiv = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-template: 1fr 20% 1fr / 1fr 20% 20% 1fr;
  grid-gap: 20px;
`;

const SplashScreenButton = styled.button`
  grid-column: ${(props) => props.join ? 2 : 3};
  grid-row: 2;
`;

const App = () => {
  const [town, setTown] = useState('');
  const username = 'sam';
  // const [username, setUsername] = useState('');
  const [sockets, setSockets] = useState([]);
  const [room, setRoom] = useState('');

  // make a new room with the namespace of the id returned
  const createGameRoom = () => {
    api.createGameRoom('sam')
      .then(({ gameId, chatRooms }) => {
        setRoom(gameId);
        setTown(chatRooms[0]);
        const rooms = [];
        for (let i = 1; i < chatRooms.length; i++) {
          const { roomName, roomId } = chatRooms[i];
          rooms.push({
            roomId,
            username,
            userId: roomId,
            gameId,
            roomName,
          });
        }

        setSockets(rooms);
      });
  };

  const joinGameRoom = () => {
    // not implemented atm
    // api.joinGameRoom('sam');
  };


  const splashScreen = () => {
    if (!town) {
      return (
        <SplashScreenDiv>
          <SplashScreenButton join type="button" onClick={createGameRoom}>Create Room</SplashScreenButton>
          <SplashScreenButton type="button" onClick={joinGameRoom}>Join Room</SplashScreenButton>
        </SplashScreenDiv>
      );
    }
    return (
      <MainDiv>
        <div>{room}</div>
        {
          sockets.map((roomData) => (
            <ChatRoom
              key={roomData.roomId}
              roomData={roomData}
            />
          ))
        }
      </MainDiv>
    );
  };

  return (
    <MainDiv>
      {splashScreen()}

    </MainDiv>
  );
};

export default App;
