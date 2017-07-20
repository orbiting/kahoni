import React from 'react'

import ActionBar from '../ActionBar/'
import Author from './Author'
import Time from './Time'

import { css } from 'glamor'

import { Link } from '../../routes'
import { PUBLIC_BASE_URL } from '../../constants'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

const styles = {
  icon: css({
    display: 'inline-block',
    verticalAlign: 'middle'
  })
}

const ArticleElement = ({
  title,
  lead,
  body,
  author,
  updatedAt,
  readingMinutes,
  slug,
  dossiers,
  comments
}) => {
  return (
    <article>
      <Interaction.P>
        {dossiers.map(dossier =>
          <Link route="dossier" params={{ slug: dossier.slug }}>
            <a>
              Dossier {dossier.title}
            </a>
          </Link>
        )}
      </Interaction.P>
      <H1>
        {title}
      </H1>
      <Lead>
        {lead}
      </Lead>
      <Author name={author} />
      <Time date={updatedAt} readingMinutes={readingMinutes} />
      <ActionBar
        url={PUBLIC_BASE_URL + `/artikel/${slug}`}
        emailSubject="{Article.title}"
      />

      <P>
        {body}
      </P>

      <Interaction.H2>Kommentare</Interaction.H2>
      {comments.map(comment =>
        <Interaction.P>
          {comment.body}
        </Interaction.P>
      )}
    </article>
  )
}

export default ArticleElement
