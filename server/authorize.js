const { cmsFetchAsAdmin } = require('./cms')

module.exports = async (req, res) => {
  const { sessionId, phrase } = req.query
  const email = String(req.query.email).toLowerCase()
  if (!sessionId) {
    res.status(400).json({
      errors: ['Invalid Request']
    })
  }

  try {
    const sessionQuery = await cmsFetchAsAdmin({
      query: `query($id: ID!) {
        Session(id: $id) {
          email
          secret
        }
      }`,
      variables: {
        id: sessionId
      }
    })

    const session = sessionQuery.data.Session
    if (!session || session.email !== email || session.secret !== phrase) {
      res.status(400).json({
        errors: ['Invalid Request']
      })
    }

    const memberQuery = await cmsFetchAsAdmin({
      query: `query($email: String!) {
        Member(email: $email) {
          id
        }
      }`,
      variables: {
        email
      }
    })

    if (memberQuery.data.Member === null) {
      await cmsFetchAsAdmin({
        query: `mutation($email: String!, $sessionId: ID!) {
          createMember(email: $email, sessionsIds: [$sessionId]) {
            id
          }
        }`,
        variables: {
          email,
          sessionId
        }
      })
    } else {
      const memberId = memberQuery.data.Member.id
      await cmsFetchAsAdmin({
        query: `mutation($memberId: ID!, $sessionId: ID!) {
          addToMemberOnSession(memberMemberId: $memberId, sessionsSessionId: $sessionId) {
            sessionsSession {
              id
            }
          }
        }`,
        variables: {
          memberId,
          sessionId
        }
      })
    }
  } catch (e) {
    res.json({
      errors: [e.toString()]
    })
  }

  return res.json({
    data: {
      authorize: true
    }
  })
}
