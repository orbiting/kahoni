import React, { Component } from 'react'

import IconLink from '../IconLink'
import Share from '../Share'

import { css, merge, style } from 'glamor'

import { mediaQueries, Label } from '@project-r/styleguide'

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

const Panel = ({ active, url }) => {
  return (
    <div {...styles.panel}>
      <Label {...styles.label}>
        Teilen Sie diesen Artikel mit Ihren Freunden:
      </Label>
      <Share
        url={PUBLIC_BASE_URL + url.pathname}
        emailSubject={'TODO: Add article name'}
      />
    </div>
  )
}

class ShareIcon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  togglePanel = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const { fill, url } = this.props
    const { active } = this.state

    return (
      <span>
        <span onClick={this.togglePanel} active={this.state.active}>
          <IconLink fill={fill} icon={'share'} url={url} />
        </span>
        {active && <Panel url={url} />}
      </span>
    )
  }
}

export default ShareIcon
