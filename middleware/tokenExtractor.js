const jwt = require('jsonwebtoken')

const { Token } = require('../models')

const { SECRET } = require('../util/config')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const activeToken = await Token.findOne({
      where: {
        token: authorization.substring(7)
      }
    })
    try {
      console.log(authorization.substring(7))
      if (!activeToken) {
        return res.status(401).json({ error: 'token invalid' })
      }
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = tokenExtractor