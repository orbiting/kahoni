import React from 'react'
import App from '../components/App'
import Frame from '../components/Frame'
import withData from '../lib/withData'

export default withData(({ url }) =>
  <Frame url={url}>
    <article>
      <h1>Mitmachen</h1>
    </article>
  </Frame>
)
