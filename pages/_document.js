import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'
import { fontFaces } from '@project-r/styleguide'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return {
      ...page,
      ...styles,
      env: {}
    }
  }
  constructor(props) {
    super(props)
    const { __NEXT_DATA__, env } = props
    if (env) {
      __NEXT_DATA__.env = this.props.env
    }
  }
  render() {
    const {
      css,
      env: { PIWIK_URL_BASE, PIWIK_SITE_ID, STATIC_BASE_URL }
    } = this.props
    const piwik = !!PIWIK_URL_BASE && !!PIWIK_SITE_ID
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <style dangerouslySetInnerHTML={{ __html: fontFaces() }} />
          {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
          <meta name="author" content="Republik" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${STATIC_BASE_URL}/static/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${STATIC_BASE_URL}/static/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${STATIC_BASE_URL}/static/favicon-16x16.png`}
            sizes="16x16"
          />
          <link
            rel="manifest"
            href={`${STATIC_BASE_URL}/static/manifest.json`}
          />
          <link
            rel="mask-icon"
            href={`${STATIC_BASE_URL}/static/safari-pinned-tab.svg`}
            color="#000000"
          />
          <link
            rel="shortcut icon"
            href={`${STATIC_BASE_URL}/static/favicon.ico`}
          />
          {/* browserconfig.xml can contain other static references, we skip cdnifing it */}
          <meta
            name="msapplication-config"
            content="/static/browserconfig.xml"
          />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {piwik &&
            <script
              dangerouslySetInnerHTML={{
                __html: `
            var _paq = _paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              _paq.push(['setTrackerUrl', '${PIWIK_URL_BASE}/piwik.php']);
              _paq.push(['setSiteId', '${PIWIK_SITE_ID}']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.type='text/javascript'; g.async=true; g.defer=true; g.src='${PIWIK_URL_BASE}/piwik.js'; s.parentNode.insertBefore(g,s);
            })();`
              }}
            />}
          {piwik &&
            <noscript>
              <img
                src={`${PIWIK_URL_BASE}/piwik.php?idsite=${PIWIK_SITE_ID}&rec=1`}
                style={{ border: 0 }}
                alt=""
              />
            </noscript>}
        </body>
      </html>
    )
  }
}
