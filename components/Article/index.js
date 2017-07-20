import React from 'react'

import ActionBar from '../ActionBar/'
import ArticleFormat from './ArticleFormat'
import Comments from './Comments'
import OpinionFormat from './OpinionFormat'
import ReportageFormat from './ReportageFormat'

const ArticleElement = ({ article }) => {
  if (article.format == 'OPINION') {
    return (
      <div>
        <OpinionFormat article={article} />
        <Comments comments={article.comments} />
      </div>
    )
  } else if (article.format == 'REPORTAGE') {
    return (
      <div>
        <ReportageFormat article={article} />
        <Comments comments={article.comments} />
      </div>
    )
  } else {
    return (
      <div>
        <ArticleFormat article={article} />
        <Comments comments={article.comments} />
      </div>
    )
  }
}

export default ArticleElement
