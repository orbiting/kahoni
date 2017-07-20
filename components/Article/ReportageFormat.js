import React from 'react'

import ActionBar from '../ActionBar/'
import Author from './Author'
import Time from './Time'

import { css } from 'glamor'

import { Link } from '../../routes'
import { PUBLIC_BASE_URL } from '../../constants'

import {
  H1,
  H2,
  Interaction,
  Label,
  Lead,
  P,
  mediaQueries
} from '@project-r/styleguide'

// TODO: Implement light/dark theme.
// TODO: Implement photo for cover.

const styles = {
  cover: css({
    backgroundColor: '#ddd',
    minHeight: '500px',
    padding: '50px 20px 180px 20px',
    position: 'relative',
    textAlign: 'center',
    [mediaQueries.onlyS]: {
      margin: '0 -20px'
    }
  }),
  meta: css({
    bottom: '20px',
    left: 0,
    position: 'absolute',
    right: 0
  })
}

const ReportageFormat = ({ article }) => {
  return (
    <article>
      <div {...styles.cover}>
        <H1 style={{ textAlign: 'center' }}>
          {article.title}
        </H1>
        <div {...styles.meta}>
          <Author name={article.author} showBadge={true} />
          <Time
            date={article.updatedAt}
            readingMinutes={article.readingMinutes}
          />
        </div>
      </div>
      <ActionBar
        url={PUBLIC_BASE_URL + `/artikel/${article.slug}`}
        emailSubject="{Article.title}"
      />
      <P>
        {article.body}
      </P>
      <Interaction.P>
        {article.dossiers.map(dossier =>
          <Link
            route="dossier"
            params={{ slug: dossier.slug }}
            key={dossier.id}
          >
            <a>
              Dossier {dossier.title}
            </a>
          </Link>
        )}
      </Interaction.P>
    </article>
  )
}

export default ReportageFormat
