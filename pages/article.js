import React from 'react'
import { Link } from '../routes'
import Frame from '../components/Frame'
import Meta from '../components/Frame/Meta'
import Loader from '../components/Loader'
import ArticleElement from '../components/Article'
import withData from '../lib/withData'
import withMe from '../lib/withMe'
import { compose } from 'redux'

import { css } from 'glamor'
import { gql, graphql } from 'react-apollo'

import { PUBLIC_BASE_URL, STATIC_BASE_URL } from '../constants'

import {
  H1,
  H2,
  Interaction,
  Label,
  Lead,
  P,
  linkRule
} from '@project-r/styleguide'

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
      photos {
        id
        author
        caption
        file {
          id
          url
        }
      }
      readingMinutes
      slug
      title
      theme
      createdAt
    }
  }
`

const ArticlePage = compose(
  withMe,
  graphql(article)
)(({ data: { loading, error, Article }, me, url: { query: { share } } }) => {
  if (!share && !(me && me.membership)) {
    return (
      <div>
        <Interaction.H3>
          Sie benötigen eine Mitgliedschaft um diesen Artikel zu lesen
        </Interaction.H3>
        <Link route="me">
          <a {...linkRule}>Jetzt Mitglied werden</a>
        </Link>
      </div>
    )
  }

  // TODO: Create component for Comment.
  // TODO: Use url.asPath for ActionBar url.
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (Article) {
          return (
            <div>
              {!!share &&
                <Meta
                  data={{
                    image: `${STATIC_BASE_URL}/static/social/share-example.png`,
                    title: Article.title,
                    description: Article.lead,
                    url:
                      PUBLIC_BASE_URL +
                      `/artikel/${Article.slug}?share=${share}`
                  }}
                />}
              <ArticleElement article={Article} me={me} share={share} />
            </div>
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
    <ArticlePage slug={url.query.slug} url={url} />
  </Frame>
)
