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
  subscription RefreshTicketsList {
    refreshTicketsList {
      success
    }
  }
`

const updateQuery = function (
  previousResult,
  {
    subscriptionData: {
      data: { refreshTicketsList }
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
  result,
  error,
  skip,
  subscribeToMore
}
