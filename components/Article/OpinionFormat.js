import React from 'react'

import ActionBar from '../ActionBar/'
import Author from './Author'
import Time from './Time'
import SharedBy from './SharedBy'

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

const styles = {
  cover: css({
    minHeight: '300px',
    padding: '50px 20px 20px 20px',
    position: 'relative',
    textAlign: 'center',
    [mediaQueries.onlyS]: {
      margin: '0 -20px'
    }
  })
}

const OpinionFormat = ({ article, me, share }) => {
  return (
    <article>
      <div {...styles.cover}>
        <H1 style={{ textAlign: 'center' }}>
          {article.title}
        </H1>
        <div>
          <Author name={article.author} showBadge={true} />
          <Time
            date={article.updatedAt}
            readingMinutes={article.readingMinutes}
          />
        </div>
      </div>
      {me &&
        <ActionBar
          url={PUBLIC_BASE_URL + `/artikel/${article.slug}`}
          emailSubject={article.title}
        />}
      {!!share && <SharedBy share={share} me={me} />}
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

export default OpinionFormat
