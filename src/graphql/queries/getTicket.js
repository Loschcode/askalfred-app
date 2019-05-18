import gql from 'graphql-tag'
import NoticesService from '@/services/NoticesService'

const query = gql`
query GetTicket($input: GetTicketInput!) {
  getTicket(input: $input) {
    id
    title
    subject
    status
    eventsConnection {
      nodes {
        id
        type
        identity {
          id
        }
        eventable {
          id
          ... on EventMessage { body }
        }
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
  this.ticket = data.getTicket

  return {
    data
  }
}

const error = function (error) {
  new NoticesService(this).graphError(error)
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
