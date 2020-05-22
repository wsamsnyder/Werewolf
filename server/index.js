/* eslint-disable no-console */
const express = require('express');
const { db } = require('../database/controllers');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/api/startTime', (req, res) => {
  //
});

app.listen(port, () => console.log(`listening on port ${port}`));
