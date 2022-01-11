const router = require('express').Router()

const tokenExtractor = require('../middleware/tokenExtractor')

const { Readinglist, User } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const reading = await Readinglist.create(req.body)
    res.json(reading)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const reading = await Readinglist.findByPk(req.params.id)  
  if (reading) {
    const user = await User.findByPk(req.decodedToken.id)
    if (user.id !== reading.userId) {
      return res.status(401).json({ error: 'operation not permitted' })
    }

    try {
      reading.read = req.body.read
      await reading.save()
      res.json(reading)
    } catch(error) {
      next(error)
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router