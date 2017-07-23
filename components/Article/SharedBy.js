import React from 'react'
import { Interaction, fontFamilies, colors } from '@project-r/styleguide'
import { css } from 'glamor'

const styles = {
  box: css({
    padding: 10,
    backgroundColor: colors.primaryBg
  }),
  name: css({
    fontFamily: fontFamilies.sansSerifMedium
  })
}

export default ({ share }) =>
  <div {...styles.box}>
    <Interaction.P>
      <span {...styles.name}>{share}</span> hat diesen Artikel mit dir und 234
      anderen geteilt.
    </Interaction.P>
  </div>
