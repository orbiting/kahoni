import React from 'react'
import Frame from '../components/Frame'

import SignIn from '../components/Auth/SignIn'
import Membership from '../components/Membership'

import withData from '../lib/withData'
import withMe from '../lib/withMe'

import { Interaction } from '@project-r/styleguide'

const Me = withMe(({ me }) => {
  if (!me) {
    return <SignIn />
  }
  return (
    <div>
      <Interaction.H1>
        Hallo {me.name || me.email}
      </Interaction.H1>
      <br />
      <Membership />
    </div>
  )
})

export default withData(({ url }) =>
  <Frame url={url}>
    <Me />
  </Frame>
)
