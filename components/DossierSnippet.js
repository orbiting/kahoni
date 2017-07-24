import React from 'react'

import Time from './Article/Time'

import { Link } from '../routes'

import { css } from 'glamor'
import { swissTime } from '../lib/utils/formats'

import {
  colors,
  mediaQueries,
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
  dossier: css({
    backgroundColor: colors.secondaryBg,
    marginBottom: '20px',
    padding: '20px',
    [mediaQueries.onlyS]: {
      margin: '0 -20px 20px -20px'
    }
  }),
  titleLink: css({
    color: 'inherit',
    textDecoration: 'none'
  })
}

const timeFormat = swissTime.format('%d. %B %Y')

const DossierSnippet = ({ dossier }) => {
  const articles = dossier.articles.slice(0, 3)
  return (
    <article {...styles.dossier}>
      <Interaction.H2 style={{ marginBottom: 0 }}>
        <Link route="dossier" params={{ slug: dossier.slug }}>
          <a {...styles.titleLink}>
            Dossier {dossier.title}
          </a>
        </Link>
      </Interaction.H2>
      <div>
        {articles.map(article =>
          <div {...styles.article}>
            <H2 style={{ marginBottom: 0 }}>
              <Link route="article" params={{ slug: article.slug }}>
                <a {...styles.titleLink}>
                  {article.title}
                </a>
              </Link>
            </H2>
            <Time date={article.updatedAt} />
          </div>
        )}
      </div>
      <Interaction.P style={{ marginBottom: 0, textAlign: 'center' }}>
        <Link route="dossier" params={{ slug: dossier.slug }}>
          <a {...styles.titleLink}>Alle anzeigen</a>
        </Link>
      </Interaction.P>
    </article>
  )
}

export default DossierSnippet
