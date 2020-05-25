exports.api = {
  createRoom: (moderator) => fetch('/newRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ moderator }),
  })
    .then((response) => response.json()),
};
