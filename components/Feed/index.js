import React from 'react'
import ArticleSnippet from '../ArticleSnippet'
import Loader from '../Loader'
import { gql, graphql } from 'react-apollo'

import { Link } from '../../routes'
import { Interaction, linkRule } from '@project-r/styleguide'

const allArticles = gql`
  query allArticles {
    allArticles {
      id
      author
      createdAt
      updatedAt
      readingMinutes
      slug
      title
      dossiers {
        id
        title
      }
    }
    allQuestions(first: 1, orderBy: votes_DESC) {
      createdAt
      id
      body
      votes
    }
  }
`

const Feed = ({ data: { loading, error, allArticles, allQuestions } }) => {
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        return (
          <div>
            {allArticles.map(article =>
              <ArticleSnippet key={article.id} article={article} />
            )}
            <br />
            <br />
            <Interaction.H2>Offene Frage</Interaction.H2>
            {allQuestions.map(question =>
              <Interaction.P key={question.id}>
                <Link route="question" params={{ id: question.id }}>
                  <a {...linkRule}>
                    {question.body}
                  </a>
                </Link>
              </Interaction.P>
            )}
            <br />

            <Link route="forum">
              <a {...linkRule}>Alle offenen Fragen</a>
            </Link>
          </div>
        )
      }}
    />
  )
}

export default graphql(allArticles)(Feed)
