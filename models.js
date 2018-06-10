const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db-dev.sqlite',
  // https://github.com/sequelize/sequelize/issues/8417
  operatorsAliases: Sequelize.Op,
  logging: console.log
});

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING
  }
})

const Board = sequelize.define('board', {
  title: {
    type: Sequelize.STRING
  }
})
Board.belongsTo(User)

const List = sequelize.define('list', {
  title: {
    type: Sequelize.STRING
  }
})
Board.hasMany(List)

const Card = sequelize.define('card', {
  title: {
    type: Sequelize.STRING
  }
})
Card.belongsTo(List)

module.exports = { 
  sequelize, 
  User,
  Board,
  List,
  Card
}