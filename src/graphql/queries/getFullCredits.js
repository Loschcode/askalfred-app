import gql from 'graphql-tag'
import NoticesService from '@/services/NoticesService'

const query = gql`
query GetFullCredits {
  getFullCredits {
    id
    time
  }
}
`
const variables = function () {
  return {
  }
}

const result = function ({ data }) {
  this.credits = data.getFullCredits
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
  subscription RefreshCredits($id: ID!) {
    refreshCredits(id: $id) {
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
      data: { refreshCredits }
    }
  }
) {
  this.$apollo.queries.getFullCredits.refetch()
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
