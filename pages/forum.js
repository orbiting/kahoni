import React from 'react'
import Frame from '../components/Frame'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

const allQuestions = gql`
  query allQuestions {
    allQuestions {
      id
      body
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
                <div key={question.id}>
                  {question.body}
                </div>
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
