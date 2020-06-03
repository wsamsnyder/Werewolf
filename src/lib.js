exports.api = {
  createGameRoom: (modUsername) => fetch('/createNamespace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ modUsername }),
  })
    .then((response) => response.json()),

  joinGameRoom: (username, roomId) => fetch('/joinNamespace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, roomId }),
  })
    .then((response) => response.json()),
};
