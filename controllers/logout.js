const router = require('express').Router()

const tokenExtractor = require('../middleware/tokenExtractor')

const { User, Token } = require('../models')

router.delete('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  try {
    await Token.destroy({
      where: { userId: user.id }
    })
    res
      .status(200)
      .send({ username: user.username, logout: "success" })
  } catch(error) {
    next(error)
  }  
})

module.exports = router