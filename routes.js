const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes
  .add('index', '/')
  .add('feed', '/feed')
  .add('dossier', '/dossier/:slug')
  .add('article', '/artikel/:slug')
  .add('join', '/beitreten')
  .add('forum', '/forum')

module.exports = routes
