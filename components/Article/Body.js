import React from 'react'

import RawHtml from '../RawHtml'

import { css } from 'glamor'

const style = css({
  fontSize: 16,
  lineHeight: '26px'
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
