import withData from '../lib/withData'
import Frame from '../components/Frame'

import { H1 } from '@project-r/styleguide'

export default withData(({ url }) =>
  <Frame url={url}>
    <H1>Es ist Zeit.</H1>
  </Frame>
)
