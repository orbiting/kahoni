import React from 'react'

import Membership from '../Membership'
import SignIn from '../Auth/SignIn'
import { H1, Interaction } from '@project-r/styleguide'

export default () =>
  <div>
    <H1>Es ist Zeit.</H1>
    <Membership />
    <br />
    <Interaction.P>
      Journalismus kostet. Werde ein Teil der Republik:
    </Interaction.P>
    <br />
    <SignIn label="Registrieren" />
  </div>
