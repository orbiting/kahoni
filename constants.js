const ENV =
  typeof window !== 'undefined' ? window.__NEXT_DATA__.env : process.env

// ENV variables exported here are sent to the client via pages/_document.js

exports.API_BASE_URL = ENV.API_BASE_URL
exports.API_AUTHORIZATION_HEADER = ENV.API_AUTHORIZATION_HEADER

exports.PUBLIC_BASE_URL = ENV.PUBLIC_BASE_URL
exports.STATIC_BASE_URL = ENV.STATIC_BASE_URL || ENV.PUBLIC_BASE_URL

exports.STRIPE_PUBLISHABLE_KEY = ENV.STRIPE_PUBLISHABLE_KEY

exports.PF_PSPID = ENV.PF_PSPID
exports.PF_FORM_ACTION = ENV.PF_FORM_ACTION

exports.PAYPAL_FORM_ACTION = ENV.PAYPAL_FORM_ACTION
exports.PAYPAL_BUSINESS = ENV.PAYPAL_BUSINESS
exports.PAYPAL_DONATE_LINK = ENV.PAYPAL_DONATE_LINK

exports.PIWIK_URL_BASE = ENV.PIWIK_URL_BASE
exports.PIWIK_SITE_ID = ENV.PIWIK_SITE_ID

exports.COUNTDOWN_UTC = ENV.COUNTDOWN_UTC
exports.COUNTDOWN_DATE = ENV.COUNTDOWN_UTC ? new Date(ENV.COUNTDOWN_UTC) : null
exports.COUNTDOWN_NOTE = ENV.COUNTDOWN_NOTE

exports.DISABLE_REMINDER = ENV.DISABLE_REMINDER

exports.STATUS_POLL_INTERVAL_MS = ENV.STATUS_POLL_INTERVAL_MS
exports.STATS_POLL_INTERVAL_MS = ENV.STATS_POLL_INTERVAL_MS
exports.VOTING_POLL_INTERVAL_MS = ENV.VOTING_POLL_INTERVAL_MS
exports.TV_POLL_INTERVAL_MS = ENV.TV_POLL_INTERVAL_MS

exports.CROWDFUNDING_NAME = ENV.CROWDFUNDING_NAME || 'REPUBLIK'
