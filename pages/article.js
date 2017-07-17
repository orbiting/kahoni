import React from 'react'
import Frame from '../components/Frame'
import { Link } from '../routes'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

const article = gql`
  query article($slug: String!) {
    Article(slug: $slug) {
      id
      title
      slug
      dossiers {
        id
        title
        slug
      }
    }
  }
`

const Article = graphql(article)(({ data: { loading, error, Article } }) => {
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (Article) {
          return (
            <div>
              <h1>
                {Article.title}
              </h1>
              <div>
                Dossier:&nbsp;
                {Article.dossiers.map(dossier =>
                  <Link route="dossier" params={{ slug: dossier.slug }}>
                    {dossier.title}
                  </Link>
                )}
              </div>
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
      <Article slug={url.query.slug} />
    </article>
  </Frame>
)
