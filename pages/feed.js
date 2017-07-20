import React from 'react'
import Frame from '../components/Frame'
import { Link } from '../routes'
import Loader from '../components/Loader'
import { css, select } from 'glamor'
import { gql, graphql } from 'react-apollo'
import { swissTime } from '../lib/utils/formats'
import withData from '../lib/withData'

import { H2, Interaction, Label } from '@project-r/styleguide'

const styles = {
  article: css({
    borderBottom: '1px solid #DADDDC',
    padding: '20px 0'
  }),
  author: css({
    marginTop: 0,
    marginBottom: 0
  })
}

const timeFormat = swissTime.format('%d. %B %Y')

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
const Article = ({ article }) => {
  const date = new Date(article.updatedAt)
  return (
    <article {...styles.article}>
      <H2 style={{ marginBottom: 0 }}>
        <Link route="article" params={{ slug: article.slug }}>
          {article.title}
        </Link>
      </H2>
      <Interaction.P {...styles.author}>
        Von {article.author}
      </Interaction.P>
      <Label {...styles.meta}>
        {timeFormat(date)}
      </Label>
    </article>
  )
}

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
              <Article key={article.id} article={article} />
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
