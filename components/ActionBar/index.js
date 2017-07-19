import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconLink from '../IconLink'
import ShareIcon from './ShareIcon'

import { css } from 'glamor'

import { colors } from '@project-r/styleguide'

const styles = {
  actionbar: css({
    position: 'relative'
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
    const { fill, url } = this.props
    return (
      <div {...styles.actionbar}>
        <IconLink fill={fill} icon={'bookmark'} />
        <span onClick={this.toggleSharePanel}>
          <ShareIcon
            fill={fill}
            url={url}
            active={this.state.sharePanelActive}
          />
        </span>
        <IconLink fill={fill} icon={'heart'} />
        <IconLink fill={fill} icon={'comment'} />
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
