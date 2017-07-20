import React from 'react'
import ArticleSnippet from '../components/ArticleSnippet'
import Frame from '../components/Frame'
import { Link } from '../routes'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

import { H2, Interaction, Label } from '@project-r/styleguide'

const allArticles = gql`
  query allArticles {
    allArticles {
      author
      updatedAt
      id
      slug
      title
      dossiers {
        id
        title
      }
    }
  }
`

const Feed = graphql(
  allArticles
)(({ data: { loading, error, allArticles } }) => {
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
})

export default withData(({ url }) =>
  <Frame url={url}>
    <Feed />
  </Frame>
)
