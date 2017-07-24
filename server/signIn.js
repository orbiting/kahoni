const isEmail = require('email-validator').validate
const kraut = require('kraut')
const querystring = require('querystring')
const { cmsFetchAsAdmin } = require('./cms')

const { COOKIE_NAME, DEV } = require('./constants')
const sendMailTemplate = require('./sendMailTemplate')

module.exports = async (req, res) => {
  const email = String(
    req.body.variables && req.body.variables.email
  ).toLowerCase()
  const phrase =
    kraut.adjectives.random() +
    ' ' +
    kraut.verbs.random() +
    ' ' +
    kraut.nouns.random()

  if (!isEmail(email)) {
    res.status(400).json({
      data: null,
      errors: ['Invalid Email']
    })
  }

  try {
    const cmsSession = await cmsFetchAsAdmin({
      query: `mutation($email: String!, $phrase: String!) {
      createSession(email: $email, secret: $phrase) {
        id
      }
    }`,
      variables: {
        email,
        phrase
      }
    })

    const sessionId = cmsSession.data.createSession.id

    res.cookie(COOKIE_NAME, sessionId, {
      maxAge: 60000 * 60 * 24 * 7 * 4, // 4 weeks
      httpOnly: true,
      secure: !DEV
    })

    const verificationUrl =
      (process.env.PUBLIC_URL || 'http://' + req.headers.host) +
      '/authorize?' +
      querystring.stringify({
        email,
        phrase,
        sessionId
      })

    await sendMailTemplate({
      to: email,
      fromEmail: process.env.AUTH_MAIL_FROM_ADDRESS,
      subject: 'E-Mail-Adresse bestätigen (für die Republik)',
      templateName: 'cf_signin',
      globalMergeVars: [
        {
          name: 'LOCATION',
          content: 'UNKNOWN'
        },
        {
          name: 'SECRET_WORDS',
          content: phrase
        },
        {
          name: 'LOGIN_LINK',
          content: verificationUrl
        }
      ]
    })
  } catch (e) {
    res.json({
      errors: [e.toString()]
    })
  }

  return res.json({
    data: {
      signIn: {
        __typename: 'SignInResponse',
        phrase
      }
    }
  })
}
