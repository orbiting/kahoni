const { parse } = require('graphql/language/parser')
const { print } = require('graphql/language/printer')
const { cmsFetchAsAdmin } = require('./cms')
const { COOKIE_NAME } = require('./constants')

const getFirstSelectionSet = s =>
  s.definitions[0].selectionSet.selections[0].selectionSet

module.exports = (req, res) => {
  const meQuery = parse(req.body.query)

  const cookies =
    (req.headers.cookie && require('cookie').parse(req.headers.cookie)) || {}
  const cmsQuery = parse(`
    query($id: ID!){
      Session(id: $id) {
        email
        member {
          id
        }
      }
    }
  `)

  getFirstSelectionSet(cmsQuery).selections.find(
    s => s.name.value === 'member'
  ).selectionSet = getFirstSelectionSet(meQuery)

  const id = cookies[COOKIE_NAME]
  if (!id) {
    return res.json({
      data: {
        me: null
      }
    })
  }

  return cmsFetchAsAdmin({
    query: print(cmsQuery),
    variables: {
      id
    },
    operationName: null
  })
    .then(result => {
      let me = null
      const session = result.data.Session
      if (session) {
        me = session.member
      }
      return res.json({
        data: {
          me
        }
      })
    })
    .catch(error => {
      res.status(503).json({
        errors: [error.toString()]
      })
    })
}
