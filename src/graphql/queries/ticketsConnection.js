import gql from 'graphql-tag'
import NoticesService from '@/services/NoticesService'

const query = gql`
query TicketsConnection(
  $ticketsFirst: Int,
) {
  ticketsConnection(first: $ticketsFirst) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasPreviousPage
      hasNextPage
    }
    nodes {
      id
      title
      subject
      status
      createdAt
      lastMessageFromAlfred {
        createdAt
        id
        body
        event {
          seenAt
        }
      }
    }
  }
}
`
const variables = function () {
  return {
    ticketsFirst: this.ticketsFirst
  }
}

const fetchPolicy = 'cache-and-network'

const result = function ({ data }) {
  return {
    data
  }
}

const error = function (error) {
  new NoticesService(this).graphError(error)
}

const skip = function () {
  return false
}

// Subscription handling
const document = gql`
  subscription RefreshTicketsConnection {
    refreshTicketsConnection {
      success
    }
  }
`

const updateQuery = function (
  previousResult,
  {
    subscriptionData: {
      data: { refreshTicketsConnection }
    }
  }
) {
  this.$apollo.queries.ticketsConnection.refetch()
}

const subscribeToMore = {
  document,
  updateQuery
}

export default {
  query,
  variables,
  fetchPolicy,
  result,
  error,
  skip,
  subscribeToMore
}
