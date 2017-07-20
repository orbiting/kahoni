import React from 'react'

import { css } from 'glamor'

import { Button, Field, Label, colors } from '@project-r/styleguide'

const styles = {
  newsletter: css({
    padding: '20px 0',
    borderTop: `1px solid ${colors.divider}`,
    borderBottom: `1px solid ${colors.divider}`
  })
}

// TODO: Make this a functional form
const NewsletterBox = ({ label }) => {
  return (
    <div {...styles.newsletter}>
      <Label>
        {label ||
          'Bitte melden Sie sich an oder werden Sie ein Teil der Republik.'}
      </Label>
      <Field label={'Ihre E-Mail'} name="email" />
      <Button>
        {'Jetzt registrieren'}
      </Button>
    </div>
  )
}

export default NewsletterBox
