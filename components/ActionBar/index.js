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
  }),
  count: css({
    display: 'inline-block',
    marginLeft: '-5px',
    verticalAlign: 'top'
  }),
  icon: css({
    padding: '10px 10px',
    ':first-child': {
      paddingLeft: 0
    },
    ':last-child': {
      paddingRight: 0
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
        <span {...styles.icon}>
          <IconLink fill={fill} icon={'bookmark'} />
        </span>
        <span onClick={this.toggleSharePanel} {...styles.icon}>
          <IconLink fill={fill} icon={'share'} url={url} />
        </span>
        <span {...styles.icon}>
          <IconLink fill={fill} icon={'heart'} />{' '}
          <span {...styles.count}>23</span>
        </span>
        <span {...styles.icon}>
          <IconLink fill={fill} icon={'comment'} />{' '}
          <span {...styles.count}>7</span>
        </span>
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
