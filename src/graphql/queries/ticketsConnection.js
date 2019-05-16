import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const query = gql`
query TicketsConnection(
  $ticketsFirst: Int,
  $messagesFirst: Int
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
      status
      messagesConnection(first: $messagesFirst) {
        nodes {
          id
          body
        }
      }
    }
  }
}
`
const variables = function () {
  return {
    ticketsFirst: this.ticketsFirst,
    messagesFirst: 1
  }
}

const result = function ({ data }) {
  return {
    data
  }
}

const error = function (error) {
  new EventsService(this).graphError(error)
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
  result,
  error,
  skip,
  subscribeToMore
}
