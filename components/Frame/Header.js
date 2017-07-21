import React, { Component } from 'react'
import { css, merge } from 'glamor'
import Router from 'next/router'
import { compose } from 'redux'

import withT from '../../lib/withT'
import withMe from '../../lib/withMe'

import {
  Logo,
  Button,
  Container,
  CONTENT_PADDING as CONTAINER_PADDING,
  colors,
  mediaQueries
} from '@project-r/styleguide'

import Menu from './Menu'
import Toggle from './Toggle'
import LoadingBar from './LoadingBar'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from './constants'

import PersonIcon from '../Icons/Person'
import SearchIcon from '../Icons/Search'
import NotificationIcon from '../Icons/Notification'

const styles = {
  bar: css({
    zIndex: 20, // goes over footer
    position: 'fixed',
    '@media print': {
      position: 'absolute'
    },
    top: 0,
    left: 0,
    right: 0
  }),
  barOpaque: css({
    backgroundColor: '#fff',
    height: HEADER_HEIGHT_MOBILE,
    [mediaQueries.mUp]: {
      height: HEADER_HEIGHT
    },
    borderBottom: `1px solid ${colors.divider}`
  }),
  logo: css({
    paddingTop: 15,
    [mediaQueries.mUp]: {
      paddingTop: 25
    },
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 0
  }),
  menu: css({
    [mediaQueries.mUp]: {
      display: 'inline-block',
      marginLeft: 15,
      paddingTop: 25,
      verticalAlign: 'middle'
    }
  }),
  link: css({
    textDecoration: 'none',
    color: colors.text,
    ':visited': {
      color: colors.text
    },
    ':hover': {
      color: '#ccc'
    }
  }),
  cover: css({
    marginBottom: 40
  }),
  icons: css({
    position: 'absolute',
    right: 0,
    top: 0
  }),
  iconWrapper: css({
    display: 'inline-block',
    padding: '14px 0px 8px',
    marginRight: 10,
    [mediaQueries.mUp]: {
      padding: '26px 0px'
    }
  }),
  portrait: css({
    height: HEADER_HEIGHT_MOBILE,
    marginLeft: 5,
    verticalAlign: 'top',
    [mediaQueries.mUp]: {
      height: HEADER_HEIGHT
    }
  }),
  initials: css({
    display: 'inline-block',
    marginLeft: 5,
    verticalAlign: 'top',
    textAlign: 'center',
    backgroundColor: '#ccc',
    textTransform: 'uppercase',
    width: HEADER_HEIGHT_MOBILE,
    height: HEADER_HEIGHT_MOBILE,
    paddingTop: 12,
    fontSize: 20,
    [mediaQueries.mUp]: {
      width: HEADER_HEIGHT,
      height: HEADER_HEIGHT,
      paddingTop: 26
    }
  })
}

const IconWrapper = ({ children }) =>
  <span {...styles.iconWrapper}>
    {children}
  </span>

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opaque: !this.props.cover,
      mobile: false,
      expanded: false
    }

    this.onScroll = () => {
      const y = window.pageYOffset

      const yOpaque = this.state.mobile ? 70 : 150
      const opaque = y > yOpaque || !this.props.cover

      if (opaque !== this.state.opaque) {
        this.setState(() => ({ opaque }))
      }
    }
    this.measure = () => {
      const mobile = window.innerWidth < mediaQueries.mBreakPoint
      if (mobile !== this.state.mobile) {
        this.setState(() => ({ mobile }))
      }
      const hasStatusSpace = window.innerWidth >= 1000
      if (hasStatusSpace !== this.state.hasStatusSpace) {
        this.setState(() => ({ hasStatusSpace }))
      }
      this.onScroll()
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.measure)
    this.measure()
  }
  componentDidUpdate() {
    this.measure()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.measure)
  }
  render() {
    const { cover, sticky, forceStatus, url, me, t } = this.props
    const { mobile, expanded, hasStatusSpace } = this.state

    const opaque = this.state.opaque || expanded

    const barStyle = opaque ? merge(styles.bar, styles.barOpaque) : styles.bar

    const logoHeight = mobile ? 18 : 30

    const menuItems = [
      {
        label: t('menu/feed'),
        href: '/feed'
      },
      {
        label: t('menu/forum'),
        href: '/forum'
      },
      {
        label: t('menu/join'),
        href: '/join'
      }
    ]

    return (
      <div>
        <div {...barStyle}>
          <Container style={{ position: 'relative' }}>
            {opaque &&
              <a
                {...styles.logo}
                href="/"
                onClick={e => {
                  if (
                    e.currentTarget.nodeName === 'A' &&
                    (e.metaKey ||
                      e.ctrlKey ||
                      e.shiftKey ||
                      (e.nativeEvent && e.nativeEvent.which === 2))
                  ) {
                    // ignore click for new tab / new window behavior
                    return
                  }
                  e.preventDefault()
                  if (url.pathname === '/') {
                    if (mobile && expanded) {
                      this.setState({ expanded: false })
                    }
                    window.scrollTo(0, 0)
                  } else {
                    Router.push('/').then(() => window.scrollTo(0, 0))
                  }
                }}
              >
                <Logo height={logoHeight} />
              </a>}
            <div {...styles.menu}>
              {(mobile || opaque) &&
                <Menu
                  expanded={expanded}
                  id="primary-menu"
                  items={menuItems}
                  url={url}
                />}
            </div>
            <div {...styles.icons}>
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
              {me &&
                <IconWrapper>
                  <NotificationIcon />
                </IconWrapper>}
              {mobile &&
                <IconWrapper>
                  <Toggle
                    expanded={expanded}
                    id="primary-menu"
                    onClick={() => this.setState({ expanded: !expanded })}
                  />
                </IconWrapper>}
              {me
                ? me.portrait
                  ? <img src={me.portrait.url} {...styles.portrait} />
                  : <span {...styles.initials}>
                      {(me.name || me.email).substr(0, 1)}
                    </span>
                : <IconWrapper>
                    <PersonIcon />
                  </IconWrapper>}
            </div>
          </Container>
        </div>
        <LoadingBar />
        {!!cover &&
          <div {...styles.cover}>
            {cover}
          </div>}
      </div>
    )
  }
}

export default compose(withT, withMe)(Header)
