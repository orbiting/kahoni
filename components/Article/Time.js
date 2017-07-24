import React from 'react'
import IconLink from '../IconLink'
import { swissTime } from '../../lib/utils/formats'

import { css } from 'glamor'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

const timeFormat = swissTime.format('%d. %B %Y, %H:%M Uhr')

const styles = {
  date: css({
    display: 'inline-block',
    marginRight: '15px'
  }),
  icon: css({
    display: 'inline-block',
    marginRight: '3px',
    verticalAlign: 'middle'
  })
}

const Time = ({ date, readingMinutes, color }) => {
  const articleDate = new Date(date)
  return (
    <div>
      <Interaction.P style={color && { color: color }}>
        <span {...styles.date}>{timeFormat(articleDate)}</span>
        <span {...styles.icon}>
          <IconLink icon={'time'} size={12} fill={color && color} />
        </span>
        {readingMinutes}m
      </Interaction.P>
    </div>
  )
}

export default Time
