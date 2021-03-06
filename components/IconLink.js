import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import BookmarkIcon from './Icons/Bookmark'
import CommentIcon from './Icons/Comment'
import FacebookIcon from './Icons/Facebook'
import HeartIcon from './Icons/Heart'
import ShareIcon from './Icons/Share'
import TimeIcon from './Icons/Time'
import TwitterIcon from './Icons/Twitter'
import EmailIcon from './Icons/Email'
import DownloadIcon from './Icons/Download'

const styles = {
  button: css({
    padding: '5px 5px',
    ':hover': {
      opacity: 0.6
    },
    ':first-child': {
      paddingLeft: 0
    },
    ':last-child': {
      paddingRight: 0
    }
  })
}

const ICONS = {
  bookmark: BookmarkIcon,
  comment: CommentIcon,
  facebook: FacebookIcon,
  heart: HeartIcon,
  time: TimeIcon,
  share: ShareIcon,
  twitter: TwitterIcon,
  email: EmailIcon,
  download: DownloadIcon
}

const IconLink = ({ href, target, download, fill, icon }) => {
  const Icon = ICONS[icon]
  return (
    <a href={href} {...styles.button} download={!!download} target={target}>
      <Icon fill={fill} />
    </a>
  )
}

IconLink.propTypes = {
  icon: PropTypes.oneOf(Object.keys(ICONS)).isRequired
}

export default IconLink
