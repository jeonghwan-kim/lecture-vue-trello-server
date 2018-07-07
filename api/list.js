const models = require('../models')

const update = async (req, res) => {
  const {id} = req.params
  let body = req.body

  if (!id) return res.status(400).json({error: 'no id'})

  const list = await models.List.findOne({
    where: { id }
  })
  if (!list) return res.status(404).json({error: 'no list'})

  Object.keys(body).forEach(key => {
    let value = body[key]
    if (typeof value === 'string') value = value.trim()
    
    if (!value) return 
    list[key] = value
  })

  await list.save()

  res.json({ item: list })
}

const destroy = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'no id' })

  const cardIds = await models.Card.findAll({
    where: { listId: id }
  }).map(card => card.id)

  if (cardIds.length) {
    await models.Card.destroy({
      where: {
        id: { [models.Op.in]: cardIds }
      }
    })
  }

  await models.List.destroy({
    where: { id }
  })

  res.status(204).end()
}

module.exports = {
  update,
  destroy
}