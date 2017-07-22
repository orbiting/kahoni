import { gql, graphql } from 'react-apollo'

export const meQuery = gql`
  query me {
    me {
      id
      name
      email
      portrait {
        url
      }
    }
  }
`

export default Component =>
  graphql(meQuery, {
    props: ({ data }) => {
      return {
        me: data.me
      }
    }
  })(Component)
