import React from 'react'

import ActionBar from '../ActionBar/'
import ArticleFormat from './ArticleFormat'
import Comments from '../Comments'
import OpinionFormat from './OpinionFormat'
import ReportageFormat from './ReportageFormat'

import SignUp from '../Marketing/SignUp'

const FORMATS = {
  OPINION: OpinionFormat,
  REPORTAGE: ReportageFormat
}

const ArticleElement = ({ article, share, me }) => {
  const Article = FORMATS[article.format] || ArticleFormat

  return (
    <div>
      <Article article={article} share={share} me={me} />
      <Comments comments={article.comments} />
      <SignUp />
    </div>
  )
}

export default ArticleElement
