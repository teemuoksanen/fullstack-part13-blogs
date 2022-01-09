const router = require('express').Router()
const sequelize = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: '%'+req.query.search+'%'
          }
        },
        {
          author: {
            [Op.iLike]: '%'+req.query.search+'%'
          }
        }
      ]
    }
  }

  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: 'author',
    order: [
      [sequelize.fn('SUM', sequelize.col('likes')), 'DESC']
    ]
  })
  res.json(authors)
})

module.exports = router