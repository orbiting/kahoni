import React from 'react'
import App from '../components/App'
import Frame from '../components/Frame'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

const allArticles = gql`
  query allArticles {
    allArticles {
      id
      title
      dossiers {
        id
        title
      }
    }
  }
`

const FeedList = graphql(
  allArticles
)(({ data: { loading, error, allArticles } }) => {
  if (error) return <span>{`${error}`}</span>

  if (allArticles) {
    return (
      <div>
        {allArticles.map(article =>
          <div key={article.id}>
            {article.title}
          </div>
        )}
      </div>
    )
  }

  return <div>Loading</div>
})

export default withData(({ url }) =>
  <Frame url={url}>
    <article>
      <h1>Feed</h1>
      <FeedList />
    </article>
  </Frame>
)
