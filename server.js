const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const { graphiqlExpress } = require('graphql-server-express')

const DEV = process.env.NODE_ENV && process.env.NODE_ENV !== 'production'
if (DEV || process.env.DOTENV) {
  require('dotenv').config()
}

const { cmsFetch } = require('./server/cms')
const me = require('./server/me')
const signIn = require('./server/signIn')
const signOut = require('./server/signOut')
const authorize = require('./server/authorize')

const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = next({ dir: '.', dev: DEV })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  if (!DEV && process.env.PUBLIC_BASE_URL) {
    server.enable('trust proxy')
    server.use((req, res, next) => {
      if (
        `${req.protocol}://${req.get('Host')}` !== process.env.PUBLIC_BASE_URL
      ) {
        return res.redirect(process.env.PUBLIC_BASE_URL + req.url)
      }
      return next()
    })
  }

  server.get('/authorize', authorize)
  server.post('/graphql', bodyParser.json(), (req, res) => {
    if (req.body.operationName === 'me') {
      return me(req, res)
    }
    if (req.body.operationName === 'signIn') {
      return signIn(req, res)
    }
    if (req.body.operationName === 'signOut') {
      return signOut(req, res)
    }

    cmsFetch(req.body).then(result => res.json(result)).catch(error =>
      res.status(503).json({
        errors: [error.toString()]
      })
    )
  })
  server.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  )

  server.use(handler)

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}`)
  })
})
