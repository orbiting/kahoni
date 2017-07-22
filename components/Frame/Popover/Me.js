import React from 'react'

import SignIn from '../../Auth/SignIn'
import SignOut from '../../Auth/SignOut'

import { Interaction } from '@project-r/styleguide'

export default ({ me, children }) =>
  <div>
    {children}
    {!!me &&
      <Interaction.P>
        {me.name || me.email}
      </Interaction.P>}
    <br />
    {me ? <SignOut /> : <SignIn />}
  </div>
