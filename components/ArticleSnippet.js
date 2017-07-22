import React from 'react'

import Time from './Article/Time'

import { Link } from '../routes'

import { css } from 'glamor'
import { swissTime } from '../lib/utils/formats'

import {
  colors,
  H1,
  H2,
  Interaction,
  linkRule,
  Label,
  Lead,
  P
} from '@project-r/styleguide'

const styles = {
  article: css({
    borderBottom: `1px solid ${colors.divider}`,
    padding: '20px 0'
  }),
  titleLink: css({
    color: 'inherit',
    textDecoration: 'none'
  })
}

const timeFormat = swissTime.format('%d. %B %Y')

const ArticleSnippet = ({ article }) => {
  const date = new Date(article.updatedAt)
  return (
    <article {...styles.article}>
      <H2 style={{ marginBottom: 0 }}>
        <Link route="article" params={{ slug: article.slug }}>
          <a {...styles.titleLink}>
            {article.title}
          </a>
        </Link>
      </H2>
      <Time date={article.updatedAt} readingMinutes={article.readingMinutes} />
      <Link route="article" params={{ slug: article.slug }}>
        <a {...linkRule}>Lesen</a>
      </Link>
    </article>
  )
}

export default ArticleSnippet
