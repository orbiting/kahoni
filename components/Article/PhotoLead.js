import React from 'react'

import Author from './Author'
import Time from './Time'

import { css } from 'glamor'

import { Link } from '../../routes'

import { H1, mediaQueries } from '@project-r/styleguide'

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
  })
}

const PhotoLead = ({ article }) => {
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

  return (
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
  )
}

export default PhotoLead
