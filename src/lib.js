exports.api = {
  createGameRoom: (moderator) => fetch('/createNamespace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ moderator }),
  })
    .then((response) => response.json()),

  joinGameRoom: (username, roomID) => fetch('/joinNamespace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, roomID }),
  })
    .then((response) => response.json()),
};
