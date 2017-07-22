import React, { Component } from 'react'
import { css } from 'glamor'

import 'glamor/reset'

import Header from './Header'
import Footer from './Footer'
import Meta from './Meta'
import Content from './Content'

import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from './constants'

import {
  Container,
  mediaQueries,
  fontFamilies,
  NarrowContainer
} from '@project-r/styleguide'

css.global('html', { boxSizing: 'border-box' })
css.global('*, *:before, *:after', { boxSizing: 'inherit' })

css.global('body', {
  fontFamily: fontFamilies.sansSerifRegular
})

const styles = {
  container: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }),
  coverless: css({
    paddingTop: HEADER_HEIGHT + 40,
    [mediaQueries.onlyS]: {
      paddingTop: HEADER_HEIGHT_MOBILE + 40
    }
  }),
  hideOnMobile: css({
    [mediaQueries.onlyS]: {
      display: 'none'
    }
  }),
  bodyGrower: css({
    flexGrow: 1
  })
}

class Frame extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      sticky: {}
    }
    this.setSticky = sticky => {
      this.setState(state => ({
        sticky: {
          ...state.sticky,
          ...sticky
        }
      }))
    }
  }
  render() {
    const { children, cover, indented, url, meta } = this.props
    const { sticky } = this.state

    return (
      <div {...styles.container}>
        {!!meta && <Meta data={meta} />}
        <div
          {...styles.bodyGrower}
          className={!cover ? styles.coverless : undefined}
        >
          <Header url={url} cover={cover} sticky={sticky} />
          <NarrowContainer>
            {children}
          </NarrowContainer>
        </div>
        <Footer />
      </div>
    )
  }
}

Frame.defaultProps = {
  sidebar: true
}

export default Frame
