import React from 'react'

import ActionBar from '../ActionBar/'
import Author from './Author'
import Time from './Time'
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
  cover: css({
    backgroundColor: '#ddd',
    backgroundSize: 'cover',
    minHeight: '500px',
    padding: '50px 20px 180px 20px',
    position: 'relative',
    textAlign: 'center',
    [mediaQueries.onlyS]: {
      margin: '0 -20px'
    }
  }),
  opaqueHelper: css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 0
  }),
  meta: css({
    bottom: '20px',
    left: 0,
    position: 'absolute',
    right: 0
  }),
  photo: css({
    backgroundSize: 'cover',
    height: '250px',
    width: '250px'
  })
}

const ReportageFormat = ({ article, me, share }) => {
  const coverPhoto = article.photos[0]
  const coverPhotoStyle = coverPhoto
    ? { backgroundImage: 'url(' + coverPhoto.file.url + ')' }
    : ''
  let opaqueColor = ''
  let textColor = '#000'
  if (article.theme == 'DARK') {
    opaqueColor = 'rgba(0,0,0,.25)'
    textColor = '#fff'
  } else if (article.theme == 'LIGHT') {
    opaqueColor = 'rgba(255,255,255,.75)'
  }
  let photos = article.photos.length ? [...article.photos.slice(1)] : []

  return (
    <article>
      <div {...styles.cover} style={coverPhotoStyle}>
        {opaqueColor &&
          <div
            {...styles.opaqueHelper}
            style={{ backgroundColor: opaqueColor }}
          />}
        <H1
          style={{
            position: 'relative',
            zIndex: 3,
            color: textColor
          }}
        >
          {article.title}
        </H1>
        <div {...styles.meta}>
          <Author name={article.author} showBadge={true} color={textColor} />
          <Time
            date={article.updatedAt}
            readingMinutes={article.readingMinutes}
            color={textColor}
          />
        </div>
      </div>
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
