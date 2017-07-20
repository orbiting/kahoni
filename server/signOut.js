const { COOKIE_NAME } = require('./constants')

module.exports = (req, res) => {
  res.clearCookie(COOKIE_NAME)

  return res.json({
    data: {
      signOut: true
    }
  })
}
