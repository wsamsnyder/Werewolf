exports.api = {
  createRoom: (modName) => {
    return fetch('/newRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modName }),
    })
      .then((response) => response.json());
  },
};
