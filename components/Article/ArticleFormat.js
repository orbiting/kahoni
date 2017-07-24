import React from 'react'

import ActionBar from '../ActionBar/'
import Author from './Author'
import Time from './Time'
import SharedBy from './SharedBy'
import Body from './Body'

import { Link } from '../../routes'
import { PUBLIC_BASE_URL } from '../../constants'

import {
  H1,
  H2,
  Interaction,
  Label,
  Lead,
  P,
  linkRule
} from '@project-r/styleguide'

const ArticleFormat = ({ article, share, me }) => {
  return (
    <article>
      <Interaction.P>
        {article.dossiers.map(dossier =>
          <Link
            route="dossier"
            params={{ slug: dossier.slug }}
            key={dossier.id}
          >
            <a {...linkRule}>
              Dossier {dossier.title}
            </a>
          </Link>
        )}
      </Interaction.P>
      <H1>
        {article.title}
      </H1>
      <Lead>
        {article.lead}
      </Lead>
      <Author name={article.author} />
      <Time date={article.updatedAt} readingMinutes={article.readingMinutes} />
      {me &&
        <ActionBar
          url={
            PUBLIC_BASE_URL +
            `/artikel/${article.slug}?share=${me.name ||
              me.email.split('@')[0]}`
          }
          emailSubject={article.title}
        />}
      {!!share && <SharedBy share={share} me={me} />}
      <Body article={article} />
    </article>
  )
}

export default ArticleFormat
