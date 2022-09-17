const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const getAsync = require('../redis').getAsync;

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const added_todos = await getAsync('added_todos')

  if (!added_todos) {
    res.json({ 'added_todos': 0 })
  } else {
    res.json({ 'added_todos': Number(added_todos) })
  }
});

module.exports = router;
