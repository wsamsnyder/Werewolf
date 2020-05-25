exports.api = {
  createRoom: (modName) => (
    fetch('/newRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modName }),
    })
      .then((response) => response.json());
  ),
};
