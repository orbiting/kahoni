import React, { Component } from 'react'

import IconLink from '../IconLink'
import Share from '../Share'

import { css, merge, style } from 'glamor'

import { mediaQueries, Label, Interaction } from '@project-r/styleguide'

import { PUBLIC_BASE_URL, STATIC_BASE_URL } from '../../constants'

const styles = {
  panel: css({
    backgroundColor: '#F6F8F7',
    border: '1px solid #DADDDC',
    left: 0,
    margin: '15px 0 0',
    padding: '10px',
    position: 'absolute',
    right: 0,
    top: '20px',
    zIndex: 1
  }),
  label: css({ display: 'block', marginBottom: 5 })
}

const SharePanel = ({ url, emailSubject }) => {
  return (
    <div {...styles.panel}>
      <Interaction.P>
        Teilen Sie diesen Artikel mit Ihren Freunden
      </Interaction.P>
      <br />
      <Label>Vorschau</Label>
      <br />
      <img
        src={`${STATIC_BASE_URL}/static/social/share-example.png`}
        style={{ width: '100%', maxWidth: 400 }}
      />
      <br />
      <br />
      <Share url={url} emailSubject={emailSubject} />
    </div>
  )
}

export default SharePanel
