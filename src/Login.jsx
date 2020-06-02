import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SplashScreenDiv = styled.div`
  grid-row: 3;
  grid-column: 2;
  display: grid;
  grid-template: 1fr 20% 1fr / 1fr 20% 20% 1fr;
  grid-gap: 20px;
`;

const SplashScreenButton = styled.button`
  grid-column: ${(props) => props.join ? 2 : 3};
  grid-row: 2;
`;

const JoinRoomDiv = styled.div`
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
`;

const Login = ({ createGameRoom, joinGameRoom }) => {
  const [createOrJoin, setCreateOrJoin] = useState(null);
  const [roomToJoin, setRoomToJoin] = useState('');
  const [userName, setUserName] = useState('');

  const joinRoom = (e) => {
    e.preventDefault();
  };

  const joinRoomButton = () => {
    setCreateOrJoin('join');
  };

  const render = () => {
    if (createOrJoin === null) {
      return (
        <>
          <SplashScreenButton join type="button" onClick={createGameRoom}>Create Room</SplashScreenButton>
          <SplashScreenButton type="button" onClick={joinRoomButton}>Join Room</SplashScreenButton>
        </>
      );
    }
    if (createOrJoin === 'join') {
      return (
        <>
          <JoinRoomDiv>
            <form onSubmit={joinRoom}>
              <label htmlFor="createOrJoinRoomID">
                Room ID:
                <input
                  className="createOrJoinRoomID"
                  type="text"
                  value={roomToJoin}
                  onChange={(e) => setRoomToJoin(e.target.value)}
                  required
                />
              </label>
              <input type="submit" value="Join" />
            </form>
          </JoinRoomDiv>
        </>
      );
    }
  };

  return (
    <SplashScreenDiv>
      { render(createOrJoin) }
    </SplashScreenDiv>
  );
};

Login.propTypes = {
  createGameRoom: PropTypes.func.isRequired,
  joinGameRoom: PropTypes.func.isRequired,
};

export default Login;
