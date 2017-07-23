import React, { Component } from 'react'
import withMe, { meQuery } from '../../lib/withMe'
import { css } from 'glamor'
import { color as d3Color } from 'd3-color'
import { gql, graphql } from 'react-apollo'
import { compose } from 'redux'

import {
  Interaction,
  Button,
  colors,
  mediaQueries
} from '@project-r/styleguide'

const MEMBERSHIPS = {
  MONTHLY: {
    name: 'Monatlich',
    price: 'CHF 24'
  },
  YEARLY: {
    name: 'Jährlich',
    price: 'CHF 240'
  }
}

const OPTION_PADDING = 20
const styles = {
  options: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }),
  option: css({
    paddingLeft: OPTION_PADDING,
    paddingRight: OPTION_PADDING,
    paddingTop: OPTION_PADDING / 2,
    paddingBottom: OPTION_PADDING / 2,
    width: 320,
    [mediaQueries.mUp]: {
      width: '33.3%'
    },
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  }),
  optionLabel: css({
    cursor: 'pointer'
  }),
  optionTitle: css({
    fontSize: 20,
    [mediaQueries.mUp]: {
      minHeight: 60
    }
  }),
  optionText: css({
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.4,
    flexGrow: 1
  }),
  optionSelect: css({
    display: 'block',
    minHeight: 30
  })
}

const Checked = ({ fill }) =>
  <svg
    fill={fill}
    height="24"
    width="24"
    viewBox="0 0 24 24"
    style={{ verticalAlign: 'middle' }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>

const OptionButton = ({ t, children, optionColor, checked, onClick }) => {
  let backgroundColor = d3Color(optionColor)
  backgroundColor.opacity = 0.1
  backgroundColor = backgroundColor.toString()
  return (
    <label
      {...styles.option}
      {...styles.optionLabel}
      {...css({
        backgroundColor: checked ? backgroundColor : undefined,
        ':hover': {
          backgroundColor
        }
      })}
    >
      {children}
      <span {...styles.optionSelect} style={{ color: optionColor }}>
        {checked ? <Checked fill={optionColor} /> : 'Auswählen'}
      </span>
      <input type="radio" checked={checked} onClick={onClick} hidden />
    </label>
  )
}

const updateMutation = gql`
  mutation($id: ID!, $membership: MEMBER_MEMBERSHIP) {
    updateMember(id: $id, membership: $membership) {
      membership
    }
  }
`

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    const { me, updateMembership } = this.props
    const { membership: stateMembership } = this.state
    return (
      <div>
        <Interaction.H2>
          {me && me.membership ? 'Ihr Plan' : 'Jetzt Mitglied werden'}
        </Interaction.H2>
        <br />
        <div {...styles.options}>
          {Object.keys(MEMBERSHIPS).map(key => {
            const membership = MEMBERSHIPS[key]

            const content = [
              <Interaction.H3 key="title">
                {membership.name}
              </Interaction.H3>,
              membership.price,
              <br key="br1" />,
              <br key="br2" />
            ]

            if (me) {
              return (
                <OptionButton
                  key={key}
                  optionColor={colors.primary}
                  checked={
                    key === stateMembership ||
                    (!stateMembership && me && key === me.membership)
                  }
                  onClick={() => this.setState({ membership: key })}
                >
                  {content}
                </OptionButton>
              )
            }
            return (
              <div key={key} {...styles.option}>
                {content}
              </div>
            )
          })}
        </div>

        {me &&
          stateMembership &&
          me.membership !== stateMembership &&
          <div>
            <br />
            <Button
              primary
              block
              onClick={() => {
                updateMembership(stateMembership).then(() => {
                  this.setState({ membership: undefined })
                })
              }}
            >
              {!me.membership ? 'kaufen' : 'wechseln'}
            </Button>
          </div>}
      </div>
    )
  }
}

export default compose(
  withMe,
  graphql(updateMutation, {
    props: ({ mutate, ownProps }) => ({
      updateMembership: membership =>
        mutate({
          variables: {
            id: ownProps.me.id,
            membership
          },
          refetchQueries: [
            {
              query: meQuery
            }
          ]
        })
    })
  })
)(List)
