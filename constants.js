const ENV =
  typeof window !== 'undefined' ? window.__NEXT_DATA__.env : process.env

// ENV variables exported here are sent to the client via pages/_document.js

exports.PUBLIC_BASE_URL = ENV.PUBLIC_BASE_URL
exports.STATIC_BASE_URL = ENV.STATIC_BASE_URL || ENV.PUBLIC_BASE_URL

exports.SG_COLORS = ENV.SG_COLORS
exports.SG_FONT_FACES = ENV.SG_FONT_FACES
exports.SG_LOGO_PATH = ENV.SG_LOGO_PATH
exports.SG_LOGO_VIEWBOX = ENV.SG_LOGO_VIEWBOX
exports.SG_BRAND_MARK_PATH = ENV.SG_LOGO_VIEWBOX
exports.SG_BRAND_MARK_VIEWBOX = ENV.SG_LOGO_VIEWBOX
