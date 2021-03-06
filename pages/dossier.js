import React from 'react'

import ActionBar from '../components/ActionBar/'
import ArticleSnippet from '../components/ArticleSnippet'
import Frame from '../components/Frame'
import Loader from '../components/Loader'
import { Link } from '../routes'
import withData from '../lib/withData'
import withMe from '../lib/withMe'
import { compose } from 'redux'
import SignUp from '../components/Marketing/SignUp'

import { gql, graphql } from 'react-apollo'

import { PUBLIC_BASE_URL } from '../constants'

import { H1, H2, Interaction, Label, Lead, P } from '@project-r/styleguide'

const dossier = gql`
  query dossier($slug: String!) {
    Dossier(slug: $slug) {
      id
      lead
      slug
      title
      articles {
        author
        id
        title
        readingMinutes
        slug
        createdAt
      }
    }
  }
`

const Dossier = compose(
  withMe,
  graphql(dossier)
)(({ data: { loading, error, Dossier }, me }) => {
  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        if (Dossier) {
          return (
            <div key={Dossier.id}>
              <Interaction.P>Dossier</Interaction.P>
              <Interaction.H1>
                {Dossier.title}
              </Interaction.H1>

              <P>
                {Dossier.lead}
              </P>
              {me &&
                <ActionBar
                  url={PUBLIC_BASE_URL + `/dossier/${Dossier.slug}`}
                  emailSubject={Dossier.title}
                />}
              {me && me.membership
                ? <div>
                    {Dossier.articles.map(article =>
                      <ArticleSnippet key={article.id} article={article} />
                    )}
                  </div>
                : <div>
                    <Label>Im Dossier befinden sich:</Label>
                    <Interaction.P>
                      {Dossier.articles.length} Artikel
                    </Interaction.P>
                    <br />
                    <br />
                    <SignUp />
                  </div>}
            </div>
          )
        }
      }}
    />
  )
})

export default withData(({ url }) =>
  <Frame url={url}>
    <article>
      <Dossier slug={url.query.slug} />
    </article>
  </Frame>
)
