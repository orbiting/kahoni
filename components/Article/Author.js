import React from 'react'

import { css } from 'glamor'

import { H1, H2, A, Interaction, Label, Lead, P } from '@project-r/styleguide'

const styles = {
  name: css({
    marginRight: '10px'
  })
}

const Author = ({ name }) => {
  return (
    <Interaction.P>
      <span {...styles.name}>Von {name}</span> <A href="#">Folgen</A>
    </Interaction.P>
  )
}

export default Author
