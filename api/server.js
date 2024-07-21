const express = require('express');
const server = express();

const recipesRouter = require('./recipies/recipes-router');

server.use(express.json());
server.use('/api/recipes', recipesRouter);

server.get('*', (req, res, next) => {
  res.status(404).json({ message: 'this page does not exist' });
})

module.exports = server;