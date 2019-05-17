import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const query = gql`
query GetTicket($input: GetTicketInput!) {
  getTicket(input: $input) {
    id
    title
    status
    messagesConnection {
      nodes {
        id
        body
      }
    }
  }
}
`
const variables = function () {
  return {
    input: {
      id: this.ticketId
    }
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
  return this.ticketId === null
}

// Subscription handling
const document = gql`
  subscription RefreshGetTicket {
    refreshGetTicket {
      success
    }
  }
`

const updateQuery = function (
  previousResult,
  {
    subscriptionData: {
      data: { refreshGetTicket }
    }
  }
) {
  this.$apollo.queries.getTicket.refetch()
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
