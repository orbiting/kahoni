import React from 'react'
import Frame from '../components/Frame'
import { Link } from '../routes'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

const allArticles = gql`
  query allArticles {
    allArticles {
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
              <div key={article.id}>
                <Link route="article" params={{ slug: article.slug }}>
                  {article.title}
                </Link>
              </div>
            )}
          </div>
        )
      }}
    />
  )
})

export default withData(({ url }) =>
  <Frame url={url}>
    <article>
      <h1>Feed</h1>
      <Feed />
    </article>
  </Frame>
)
