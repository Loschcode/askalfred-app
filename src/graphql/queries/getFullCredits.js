import gql from 'graphql-tag'
import NoticesService from '@/services/NoticesService'

const query = gql`
query GetFullCredits {
  getFullCredits {
    id
    time
    ticket {
      id
    }
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
  return false
}

// Subscription handling
const document = gql`
  subscription RefreshCredits {
    refreshCredits {
      success
    }
  }
`

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
