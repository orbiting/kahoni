import withData from '../lib/withData'
import Frame from '../components/Frame'
import withMe from '../lib/withMe'
import { compose } from 'redux'

import Feed from '../components/Feed'
import Marketing from '../components/Marketing'

export default compose(withData, withMe)(({ url, me }) =>
  <Frame url={url}>
    {me && me.membership ? <Feed /> : <Marketing />}
  </Frame>
)
