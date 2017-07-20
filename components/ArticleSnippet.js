import React from 'react'

import { Link } from '../routes'

import { css } from 'glamor'
import { swissTime } from '../lib/utils/formats'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

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

const ArticleSnippet = ({ article }) => {
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

export default ArticleSnippet
