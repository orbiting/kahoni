import React from 'react'
import Frame from '../components/Frame'
import { Link } from '../routes'
import Loader from '../components/Loader'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

import { H1, H2, Interaction, Lead, P } from '@project-r/styleguide'

const article = gql`
  query article($slug: String!) {
    Article(slug: $slug) {
      author
      body
      comments {
        body
      }
      id
      lead
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
  // TODO: Create components for Article and Comment.
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (Article) {
          return (
            <article>
              <H1>
                {Article.title}
              </H1>
              <P>
                von {Article.author}
              </P>
              <Lead>
                {Article.lead}
              </Lead>
              <P>
                {Article.body}
              </P>
              <P>
                Dossier:{' '}
                {Article.dossiers.map(dossier =>
                  <Link route="dossier" params={{ slug: dossier.slug }}>
                    {dossier.title}
                  </Link>
                )}
              </P>
              <Interaction.H2>Kommentare</Interaction.H2>
              {Article.comments.map(comment =>
                <Interaction.P>
                  {comment.body}
                </Interaction.P>
              )}
            </article>
          )
        } else {
          return <P>Artikel nicht gefunden</P>
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
