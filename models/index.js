const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Token = require('./token')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'usersReading' })
Blog.hasMany(Readinglist);
Readinglist.belongsTo(Blog);

User.hasMany(Token)
Token.belongsTo(User)

module.exports = {
  Blog, User, Readinglist, Token
}