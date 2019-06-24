import gql from 'graphql-tag'
import NoticesService from '@/services/NoticesService'

const query = gql`
query GetFullTicket($input: GetFullTicketInput!) {
  getFullTicket(input: $input) {
    id
    title
    subject
    status
    eventsConnection {
      nodes {
        id
        type
        createdAt
        identity {
          id
        }
        eventable {
          ... on EventMessage {
            body
          }
          ... on EventCallToAction {
            link
            label
            body
          }
          ... on EventPaymentAuthorization {
            body
            lineItem
            amountInCents
            feesInCents
            authorizedAt
            stripeChargeId
          }
          ... on EventFile {
            filePath
          }
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
  // sometimes result is null
  // because the cache is on
  if (data) this.ticket = data.getFullTicket
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
  subscription RefreshTicket($id: ID!) {
    refreshTicket(id: $id) {
      ticket {
        id
      }
    }
  }
`
// TODO : maybe turn into input so
// we use the same variables than the query
const subVariables = function () {
  return {
    id: this.ticketId
  }
}

const updateQuery = function (
  previousResult,
  {
    subscriptionData: {
      data: { refreshTicket }
    }
  }
) {
  this.$apollo.queries.getFullTicket.refetch()
}

const subscribeToMore = {
  document,
  updateQuery,
  variables: subVariables
}

export default {
  query,
  variables,
  result,
  error,
  skip,
  subscribeToMore
}
