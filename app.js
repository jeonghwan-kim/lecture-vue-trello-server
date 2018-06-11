const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')

const authService = require('./auth')
const auth = require('./api/auth')
const board = require('./api/board')
const card = require('./api/card')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/login', auth.login)

app.post('/boards', authService.ensureAuth(), board.create)
app.get('/boards', authService.ensureAuth(), board.query)
app.get('/boards/:id', authService.ensureAuth(), board.get)
app.put('/boards/:id', authService.ensureAuth(), board.update)
app.delete('/boards/:id', authService.ensureAuth(), board.destroy)

// app.get('/lists', authService.ensureAuth(), list.query)
// app.get('/lists/:id', authService.ensureAuth(), list.get)
// app.post('/lists', authService.ensureAuth(), list.create)
// app.put('/lists/:id', authService.ensureAuth(), list.update)
// app.delete('/lists/:id', authService.ensureAuth(), list.destroy)

app.post('/cards', authService.ensureAuth(), card.create)
// app.get('/cards', authService.ensureAuth(), card.query)
app.get('/cards/:id', authService.ensureAuth(), card.get)
app.put('/cards/:id', authService.ensureAuth(), card.update)
// app.delete('/cards/:id', authService.ensureAuth(), card.destroy)



app.use('/', (req, res) => res.send('This server is for lecutre-vue-trello\n'))

app.use((err, req, res, next) => {
  console.log(err)
  res.json({ error: err.message })
})

module.exports = app