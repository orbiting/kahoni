import React from 'react'

import Membership from '../Membership'
import SignIn from '../Auth/SignIn'

import withMe from '../../lib/withMe'
import { Interaction } from '@project-r/styleguide'

export default withMe(({ me, showMemberships }) =>
  <div>
    {(showMemberships || (me && !me.membership)) && <Membership />}
    <br />
    {!me &&
      <div>
        <Interaction.P>
          Journalismus kostet. Werde ein Teil der Republik:
        </Interaction.P>
        <br />
        <SignIn label="Registrieren" />
      </div>}
  </div>
)
