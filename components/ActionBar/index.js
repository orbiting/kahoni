import React from 'react'
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

const ActionBar = ({ url, fill }) => {
  return (
    <div {...styles.actionbar}>
      <IconLink fill={fill} icon={'bookmark'} />
      <ShareIcon fill={fill} url={url} />
      <IconLink fill={fill} icon={'heart'} />
      <IconLink fill={fill} icon={'comment'} />
    </div>
  )
}

ActionBar.propTypes = {
  url: PropTypes.string.isRequired,
  fill: PropTypes.string
}

ActionBar.defaultProps = {
  fill: colors.secondary
}

export default ActionBar
