const express = require('express');

const router = express.Router()

const {
  getById
} = require('./recipes-model');

router.get('/:recipe_id', (req, res, next) => {
  getById(req.params.recipe_id)
    .then(recipe => {
      res.json(recipe)
    })
    .catch(next);
});

module.exports = router;