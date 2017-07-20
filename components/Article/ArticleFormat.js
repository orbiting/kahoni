import React from 'react'

import ActionBar from '../ActionBar/'
import Author from './Author'
import Time from './Time'

import { Link } from '../../routes'
import { PUBLIC_BASE_URL } from '../../constants'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

const ArticleFormat = ({ article }) => {
  return (
    <article>
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
      <H1>
        {article.title}
      </H1>
      <Lead>
        {article.lead}
      </Lead>
      <Author name={article.author} />
      <Time date={article.updatedAt} readingMinutes={article.readingMinutes} />
      <ActionBar
        url={PUBLIC_BASE_URL + `/artikel/${article.slug}`}
        emailSubject="{Article.title}"
      />
      <P>
        {article.body}
      </P>
    </article>
  )
}

export default ArticleFormat
