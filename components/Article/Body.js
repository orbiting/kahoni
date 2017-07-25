import React from 'react'

import RawHtml from '../RawHtml'

import { css } from 'glamor'
import { fontFamilies, mediaQueries } from '@project-r/styleguide'

const style = css({
  fontSize: 16,
  lineHeight: '25px',
  [mediaQueries.mUp]: {
    fontSize: 21,
    lineHeight: '32px'
  },
  fontFamily: fontFamilies.serifRegular
})

const TextContainer = ({ children, ...props }) =>
  <div {...props} {...style}>
    {children}
  </div>

export default ({ article }) =>
  <RawHtml
    type={TextContainer}
    style="serif"
    dangerouslySetInnerHTML={{
      __html: article.body
    }}
  />
