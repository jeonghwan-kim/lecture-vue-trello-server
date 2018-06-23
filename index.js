const app = require('./app')
const models = require('./models')
const PORT = process.env.PORT || 3000

models.sequelize.sync({
  force: true
}).then(_=> {
  const user = models.User.build({
    email: 'test@test.com',
    password: '123123',
    name: 'Chris'
  })
  user.save()
}).then(_=> {
  app.listen(PORT, () => console.log(`server is running localhost:${PORT}`))
})

