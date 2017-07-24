import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import { compose } from 'redux'
import withT from '../../lib/withT'
import { css } from 'glamor'

import { Link } from '../../routes'

import {
  Label,
  A,
  linkRule,
  mediaQueries,
  Interaction
} from '@project-r/styleguide'
import { swissTime } from '../../lib/utils/formats'

const dateTimeFormat = swissTime.format('%e. %B %H.%M Uhr')

const UpVote = ({ fill, title }) =>
  <svg fill={fill} height="24" viewBox="0 0 24 24" width="24">
    <title>
      {title}
    </title>
    <path d="M7 14l5-5 5 5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
const DownVote = ({ fill, title }) =>
  <svg fill={fill} height="24" viewBox="0 0 24 24" width="24">
    <title>
      {title}
    </title>
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>

const styles = {
  question: css({
    marginBottom: 20
  }),
  voteBox: css({
    marginLeft: 10,
    float: 'right',
    textAlign: 'center'
  }),
  titleLink: css({
    color: 'inherit',
    textDecoration: 'none'
  })
}

class Question extends Component {
  render() {
    const { isDetail, question } = this.props

    const userVote = null
    const userIsEligitable = false

    const createdAt = new Date(question.createdAt)

    return (
      <div {...styles.question}>
        {!!question.id &&
          <div {...styles.voteBox}>
            <span
              {...linkRule}
              style={{
                opacity: !userIsEligitable || userVote === 'DOWN' ? 0.3 : 1,
                cursor: userIsEligitable ? 'pointer' : undefined
              }}
              onClick={event => {
                event.preventDefault()
                userIsEligitable && upVote()
              }}
            >
              <UpVote />
            </span>
            <br />
            <span>
              {question.votes}
            </span>
            <br />
            <span
              {...linkRule}
              style={{
                opacity: !userIsEligitable || userVote === 'UP' ? 0.3 : 1,
                cursor: userIsEligitable ? 'pointer' : undefined
              }}
              onClick={event => {
                event.preventDefault()
                userIsEligitable && downVote()
              }}
            >
              <DownVote />
            </span>
          </div>}
        {!isDetail
          ? <Interaction.P>
              <Link route="question" params={{ id: question.id }}>
                <a {...styles.titleLink}>
                  {question.body}
                </a>
              </Link>
            </Interaction.P>
          : <Interaction.H2>
              {question.body}
            </Interaction.H2>}
        <Label>
          {dateTimeFormat(createdAt)}
        </Label>
        <div style={{ clear: 'both' }} />
      </div>
    )
  }
}

export default Question
