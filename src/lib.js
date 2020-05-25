exports.api = {
  createRoom: () => {
    fetch('/newRoom', {
      method: 'GET',
    })
      .then((response) => response.json());
  },
};
