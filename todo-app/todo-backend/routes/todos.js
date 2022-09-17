const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

const setAsync = require('../redis').setAsync;
const getAsync = require('../redis').getAsync;

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);

  const added_todos = await getAsync('added_todos');

  if (!added_todos) {
    await setAsync('added_todos', 1)
  } else {
    await setAsync('added_todos', Number(added_todos) + 1)
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  const { text, done } = req.body

  const updatedTodo = {
    text, done
  }

  const result = await Todo.updateOne(todo, updatedTodo)
  res.send(result)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
