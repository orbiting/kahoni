import React from 'react'
import ArticleSnippet from '../ArticleSnippet'
import Loader from '../Loader'
import { gql, graphql } from 'react-apollo'

const allArticles = gql`
  query allArticles {
    allArticles {
      author
      updatedAt
      id
      readingMinutes
      slug
      title
      dossiers {
        id
        title
      }
    }
  }
`

const Feed = ({ data: { loading, error, allArticles } }) => {
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
          </div>
        )
      }}
    />
  )
}

export default graphql(allArticles)(Feed)
