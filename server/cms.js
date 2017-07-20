const { createApolloFetch } = require('apollo-fetch')

module.exports.cmsFetch = createApolloFetch({
  uri: process.env.GRAPH_CMS_URI
})

module.exports.cmsFetchAsAdmin = createApolloFetch({
  uri: process.env.GRAPH_CMS_URI
}).use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers['Authorization'] = `Bearer ${process.env.GRAPH_CMS_TOKEN}`

  next()
})
