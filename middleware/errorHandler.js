const errorHandler = (error, req, res, next) => {
  console.error('ERROR! ('+error.name+') '+error.message)

  if (error.message.startsWith('invalid input syntax')) {
    return res.status(400).send({ error: 'invalid input type' })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({ error: 'username must be unique' })
  }

  if (error.message.startsWith('notNull Violation')) {
    return res.status(400).send({ error: 'username or name cannot be empty' })
  }

  if (error.message === 'Validation error: Validation isEmail on username failed') {
    return res.status(400).send({ error: 'username must be email' })
  }

  next(error)
}

module.exports = errorHandler