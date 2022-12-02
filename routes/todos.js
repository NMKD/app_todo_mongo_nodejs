const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    // Parse JSON if add func 'lean or u need add module @handlebars/allow-prototype-access'
    const todos = await Todo.find({})
    res.render('index', {
        title: "List Todos",
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: "Create todo",
        isCreate: true
    })
})

router.post('/add', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    console.log(todo)
    try {
      await todo.save()
      res.redirect('/')
    } catch (err) {
      console.error(err.message)
    }
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !!req.body.on
    // console.log(!!req.body.on)
    await todo.save()
    res.redirect('/')
})

module.exports = router