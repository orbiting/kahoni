import React from 'react'
import { Link } from '../routes'
import Frame from '../components/Frame'
import Loader from '../components/Loader'
import ArticleElement from '../components/Article/'
import withData from '../lib/withData'

import { css } from 'glamor'
import { gql, graphql } from 'react-apollo'

import { PUBLIC_BASE_URL, STATIC_BASE_URL } from '../constants'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

const article = gql`
  query article($slug: String!) {
    Article(slug: $slug) {
      author
      body
      comments {
        id
        body
      }
      dossiers {
        id
        title
        slug
      }
      format
      id
      lead
      readingMinutes
      slug
      title
      updatedAt
    }
  }
`

const ArticlePage = graphql(
  article
)(({ data: { loading, error, Article }, url }) => {
  // TODO: Create component for Comment.
  // TODO: Use url.asPath for ActionBar url.
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (Article) {
          return <ArticleElement article={Article} />
        } else {
          return <P>Artikel nicht gefunden</P>
        }
      }}
    />
  )
})

export default withData(({ url }) =>
  <Frame url={url}>
    <ArticlePage slug={url.query.slug} url={url} />
  </Frame>
)
