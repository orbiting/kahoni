import React from 'react'
import { Link } from '../routes'
import ActionBar from '../components/ActionBar/'
import Frame from '../components/Frame'
import Loader from '../components/Loader'
import Share from '../components/Share'
import { gql, graphql } from 'react-apollo'
import withData from '../lib/withData'

import { PUBLIC_BASE_URL, STATIC_BASE_URL } from '../constants'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

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

const Article = graphql(
  article
)(({ data: { loading, error, Article }, url }) => {
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
              <ActionBar
                url={PUBLIC_BASE_URL + url.pathname + '/' + url.query.slug}
                emailSubject="{Article.title}"
              />
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
      <Article slug={url.query.slug} url={url} />
    </article>
  </Frame>
)
