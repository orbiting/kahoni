import React from 'react'
import { Link } from '../routes'
import Frame from '../components/Frame'
import Loader from '../components/Loader'
import Comments from '../components/Comments'
import withData from '../lib/withData'

import { css } from 'glamor'
import { gql, graphql } from 'react-apollo'

import { PUBLIC_BASE_URL, STATIC_BASE_URL } from '../constants'
import QuestionView from '../components/Question'

import {
  H1,
  H2,
  Interaction,
  Label,
  Lead,
  P,
  linkRule
} from '@project-r/styleguide'

const question = gql`
  query question($id: ID!) {
    Question(id: $id) {
      id
      body
      comments {
        id
        body
      }
      createdAt
      votes
    }
  }
`

const QuestionPage = graphql(
  question
)(({ data: { loading, error, Question }, url }) => {
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        return (
          <div>
            <Link route="forum">
              <a {...linkRule}>Offenen Fragen</a>
            </Link>
            <QuestionView question={Question} isDetail />
            <Comments comments={Question.comments} />
            <br />
          </div>
        )
      }}
    />
  )
})

export default withData(({ url }) =>
  <Frame url={url}>
    <QuestionPage id={url.query.id} url={url} />
  </Frame>
)
