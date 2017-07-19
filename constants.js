const ENV =
  typeof window !== 'undefined' ? window.__NEXT_DATA__.env : process.env

// ENV variables exported here are sent to the client via pages/_document.js

exports.PUBLIC_BASE_URL = ENV.PUBLIC_BASE_URL
exports.STATIC_BASE_URL = ENV.STATIC_BASE_URL || ENV.PUBLIC_BASE_URL

