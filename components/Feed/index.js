import React from 'react'
import ArticleSnippet from '../ArticleSnippet'
import DossierSnippet from '../DossierSnippet'
import Loader from '../Loader'
import { gql, graphql } from 'react-apollo'

import { Link } from '../../routes'
import { Interaction, Label, linkRule } from '@project-r/styleguide'

const allArticles = gql`
  query allArticles {
    allArticles {
      id
      author
      createdAt
      updatedAt
      readingMinutes
      slug
      title
      dossiers {
        id
        title
      }
    }
    allDossiers {
      id
      lead
      slug
      title
      articles {
        author
        id
        title
        slug
        updatedAt
      }
    }
    allQuestions(first: 1, orderBy: votes_DESC) {
      createdAt
      id
      body
      votes
    }
  }
`

const Feed = ({
  data: { loading, error, allArticles, allDossiers, allQuestions }
}) => {
  // TODO: Implement more dynamic content mixing.
  const featuredDossier = allDossiers[0]
  const articlesPrio1 = allArticles.slice(0, 2)
  const articlesPrio2 = allArticles.slice(2, 100)

  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        return (
          <div>
            {articlesPrio1.map(article =>
              <ArticleSnippet key={article.id} article={article} />
            )}
            <DossierSnippet dossier={featuredDossier} />
            {articlesPrio2.map(article =>
              <ArticleSnippet key={article.id} article={article} />
            )}
            <Interaction.H2>Offene Frage</Interaction.H2>
            {allQuestions.map(question =>
              <Interaction.P key={question.id}>
                <Link route="question" params={{ id: question.id }}>
                  <a {...linkRule}>
                    {question.body}
                  </a>
                </Link>
              </Interaction.P>
            )}
            <Link route="forum">
              <a {...linkRule}>Alle offenen Fragen</a>
            </Link>
          </div>
        )
      }}
    />
  )
}

export default graphql(allArticles)(Feed)
