const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes
  .add('index', '/')
  .add('dossier', '/dossier/:slug')
  .add('article', '/artikel/:slug')
  .add('me', '/me')
  .add('question', '/forum/:id')
  .add('forum', '/forum')

module.exports = routes
