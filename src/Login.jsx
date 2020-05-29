import React from 'react';
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

const Login = ({ createGameRoom, joinGameRoom }) => {


  const render = () => {

  }

  return (
    <SplashScreenDiv>
      <SplashScreenButton join type="button" onClick={createGameRoom}>Create Room</SplashScreenButton>
      <SplashScreenButton type="button" onClick={joinGameRoom}>Join Room</SplashScreenButton>
    </SplashScreenDiv>
  );
};

Login.propTypes = {
  createGameRoom: PropTypes.func.isRequired,
  joinGameRoom: PropTypes.func.isRequired,
};

export default Login;
