const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog } = require('../models')
const { User } = require('../models')
const { SECRET } = require('../util/config')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
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

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    try {
      const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
      res.json(blog)
    } catch(error) {
      next(error)
    }  
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.blog) {
    if (user.id === req.blog.userId) {
      await req.blog.destroy()
    } else {
      return res.status(401).json({ error: 'unauthorised' })
    }
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    } catch(error) {
      next(error)
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router