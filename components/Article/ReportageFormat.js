import React from 'react'

import ActionBar from '../ActionBar/'
import PhotoLead from './PhotoLead'
import SharedBy from './SharedBy'
import Body from './Body'

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
  mediaQueries,
  linkRule
} from '@project-r/styleguide'

const styles = {
  photo: css({
    backgroundSize: 'cover',
    height: '250px',
    width: '250px'
  })
}

const ReportageFormat = ({ article, me, share }) => {
  let photos = article.photos.length ? [...article.photos.slice(1)] : []
  return (
    <article>
      <PhotoLead article={article} />
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
      {!!photos.length &&
        <div>
          {photos.map(photo =>
            <div>
              <div
                {...styles.photo}
                style={{ backgroundImage: 'url(' + photo.file.url + ')' }}
              />
              <Label>
                {photo.caption}
              </Label>
            </div>
          )}
        </div>}
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
    </article>
  )
}

export default ReportageFormat
