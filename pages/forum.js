import React from 'react'
import Frame from '../components/Frame'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'
import { Link } from '../routes'

import { Interaction, linkRule } from '@project-r/styleguide'

import Question from '../components/Question'

const allQuestions = gql`
  query allQuestions {
    allQuestions(orderBy: votes_DESC) {
      id
      body
      createdAt
      votes
    }
  }
`

const QuestionList = graphql(
  allQuestions
)(({ data: { loading, error, allQuestions } }) => {
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (allQuestions) {
          return (
            <div>
              {allQuestions.map(question =>
                <Question question={question} key={question.id} />
              )}
            </div>
          )
        }
      }}
    />
  )
})

export default withData(({ url }) =>
  <Frame url={url}>
    <article>
      <h1>Offene Fragen</h1>
      <QuestionList />
    </article>
  </Frame>
)
