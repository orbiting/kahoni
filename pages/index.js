import withData from '../lib/withData'
import Frame from '../components/Frame'
import Me from '../components/Auth/Me'

import { H1 } from '@project-r/styleguide'

export default withData(({ url }) =>
  <Frame url={url}>
    <H1>Es ist Zeit.</H1>
    <Me />
  </Frame>
)
