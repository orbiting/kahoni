import React from 'react'
import Frame from '../components/Frame'
import { Link } from '../routes'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

const dossier = gql`
  query dossier($slug: String!) {
    Dossier(slug: $slug) {
      id
      title
      articles {
        id
        title
        slug
      }
    }
  }
`

const Dossier = graphql(dossier)(({ data: { loading, error, Dossier } }) => {
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (Dossier) {
          return (
            <div key={Dossier.id}>
              <h1>
                Dossier: {Dossier.title}
              </h1>
              <div>
                {Dossier.articles.map(article =>
                  <div key={article.id}>
                    <Link route="article" params={{ slug: article.slug }}>
                      <a>
                        {article.title}
                      </a>
                    </Link>
                  </div>
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
      <Dossier slug={url.query.slug} />
    </article>
  </Frame>
)
