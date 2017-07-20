import React from 'react'

import { css } from 'glamor'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

const styles = {
  icon: css({
    display: 'inline-block',
    verticalAlign: 'middle'
  })
}

const Author = ({ name }) => {
  return (
    <Interaction.P>
      {name}
    </Interaction.P>
  )
}

export default Author
