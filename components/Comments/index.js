import React from 'react'

import { css } from 'glamor'

import { Interaction } from '@project-r/styleguide'

const styles = {
  comments: css({
    marginTop: '30px'
  })
}

const Comments = ({ comments }) => {
  // TODO: Pluralize comments headline
  // TODO: Implement comment author and interactions
  return (
    <div {...styles.comments}>
      <Interaction.H3>
        {comments.length} Kommentare
      </Interaction.H3>
      {comments.map(comment =>
        <Interaction.P key={comment.id}>
          {comment.body}
        </Interaction.P>
      )}
    </div>
  )
}

export default Comments
