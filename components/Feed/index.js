import React from 'react'
import ArticleSnippet from '../ArticleSnippet'
import DossierSnippet from '../DossierSnippet'
import Question from '../Question'
import Loader from '../Loader'
import { gql, graphql } from 'react-apollo'
import { descending, max } from 'd3-array'

import { Link } from '../../routes'
import { Interaction, Label, linkRule } from '@project-r/styleguide'

const allArticles = gql`
  query allArticles {
    allArticles(filter: { dossiers_none: {} }) {
      id
      author
      createdAt
      readingMinutes
      slug
      title
    }
    allDossiers {
      title
      slug
      articles {
        id
        author
        createdAt
        readingMinutes
        slug
        title
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

  return (
    <Loader
      loading={loading}
      error={error}
      render={() => {
        const items = [
          ...allArticles.map(d => {
            return {
              ...d,
              createdAt: new Date(d.createdAt)
            }
          }),
          ...allDossiers.map(dossier => {
            return {
              ...dossier,
              createdAt: new Date(
                max(dossier.articles, d => new Date(d.createdAt).getTime())
              )
            }
          }),
          ...allQuestions.map(d => {
            return {
              ...d,
              createdAt: new Date(d.createdAt)
            }
          })
        ].sort((a, b) => descending(a.createdAt, b.createdAt))

        return (
          <div>
            {items.map(item => {
              if (item.__typename === 'Article') {
                return <ArticleSnippet key={item.id} article={item} />
              } else if (item.__typename === 'Dossier') {
                if (item.articles.length > 1) {
                  return <DossierSnippet key={item.id} dossier={item} />
                }
                return (
                  <ArticleSnippet key={item.id} article={item.articles[0]} />
                )
              } else if (item.__typename === 'Question') {
                return (
                  <div>
                    <Label>
                      <Link route="forum">
                        <a {...linkRule}>Offene Frage</a>
                      </Link>
                    </Label>
                    <Question question={item} />
                  </div>
                )
              }
            })}
          </div>
        )
      }}
    />
  )
}

export default graphql(allArticles)(Feed)
