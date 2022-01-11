const errorHandler = (error, req, res, next) => {
  console.error('ERROR! ('+error.name+') '+error.message)

  if (error.message.startsWith('invalid input syntax')) {
    return res.status(400).send({ error: 'invalid input type' })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({ error: 'username must be unique' })
  }

  if (error.message.startsWith('notNull Violation: user')) {
    return res.status(400).send({ error: 'username or name cannot be empty' })
  }

  if (error.message.startsWith('notNull Violation: readinglist')) {
    return res.status(400).send({ error: 'blogId or userId cannot be empty' })
  }

  if (error.message === 'Validation error: Validation isEmail on username failed') {
    return res.status(400).send({ error: 'username must be email' })
  }

  if (error.message === 'Validation error: Validation min on year failed') {
    return res.status(400).send({ error: 'year must be after 1990' })
  }

  if (error.message === 'Validation error: Validation max on year failed') {
    return res.status(400).send({ error: 'year cannot be in the future' })
  }

  next(error)
}

module.exports = errorHandler