import React from 'react'

import { css } from 'glamor'

import { H1, H2, A, Interaction, Label, Lead, P } from '@project-r/styleguide'

// TODO: Implement badges for different authors
const styles = {
  name: css({
    marginRight: '10px'
  }),
  badge: css({
    backgroundColor: '#ddd',
    backgroundImage: 'url(/static/team/constantin_seibt.jpg)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    border: '2px solid #fff',
    borderRadius: '40px',
    display: 'inline-block',
    height: '80px',
    textAlign: 'center',
    width: '80px'
  })
}

const Badge = ({ show }) => {
  if (show) {
    return <div {...styles.badge} />
  } else {
    return null
  }
}

const Author = ({ name, showBadge, color }) => {
  return (
    <div>
      <Badge show={showBadge} />
      <Interaction.P style={color && { color: color }}>
        <span {...styles.name}>Von {name}</span> <A href="#">Folgen</A>
      </Interaction.P>
    </div>
  )
}

export default Author
