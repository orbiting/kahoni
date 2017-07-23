import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconLink from '../IconLink'
import SharePanel from './SharePanel'

import { css } from 'glamor'

import { colors, mediaQueries } from '@project-r/styleguide'

const styles = {
  actionbar: css({
    padding: '10px 0',
    position: 'relative',
    [mediaQueries.onlyS]: {
      borderTop: `1px solid ${colors.divider}`,
      borderBottom: `1px solid ${colors.divider}`
    }
  })
}

class ActionBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sharePanelActive: false
    }
  }

  toggleSharePanel = () => {
    this.setState({
      sharePanelActive: !this.state.sharePanelActive
    })
  }

  render() {
    const { fill, url, emailSubject } = this.props
    return (
      <div {...styles.actionbar}>
        <IconLink fill={fill} icon={'bookmark'} />
        <span onClick={this.toggleSharePanel}>
          <IconLink fill={fill} icon={'share'} url={url} />
        </span>
        <IconLink fill={fill} icon={'heart'} />
        <IconLink fill={fill} icon={'comment'} />
        {this.state.sharePanelActive &&
          <SharePanel url={url} emailSubject={emailSubject} />}
      </div>
    )
  }
}

ActionBar.propTypes = {
  url: PropTypes.string.isRequired,
  fill: PropTypes.string
}

ActionBar.defaultProps = {
  fill: colors.secondary
}

export default ActionBar
