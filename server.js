const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const { createApolloFetch } = require('apollo-fetch')

const routes = require('./routes')

const DEV = process.env.NODE_ENV && process.env.NODE_ENV !== 'production'
if (DEV || process.env.DOTENV) {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

const app = next({ dir: '.', dev: DEV })
const handler = routes.getRequestHandler(app)

const apolloFetch = createApolloFetch({
  uri: process.env.GRAPH_CMS_URI
}).use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers['Authorization'] = `Bearer ${process.env.GRAPH_CMS_TOKEN}`

  next()
})

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

  server.post('/graphql', bodyParser.json(), (req, res) => {
    apolloFetch(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(503).json(error))
  })

  server.use(handler)

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on port ${PORT}`)
  })
})
