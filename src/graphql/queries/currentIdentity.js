import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'
import _ from 'lodash'

const query = gql`
  query CurrentIdentity {
    currentIdentity {
      id
      role
      token
      email
      firstName
      lastName
    }
  }
`

const result = function ({ data: { currentIdentity } }) {
  this.currentIdentity = currentIdentity
  return currentIdentity
}

const error = function (error) {
  new EventsService(this).crash(
    'We were unable to retrieve the current identity'
  )
}

const skip = function () {
  return this.identityToken == null
}

// Subscription handling
const updateQuery = function (
  previousResult,
  {
    subscriptionData: {
      data: { subscribeToCurrentIdentity: { currentIdentity } }
    }
  }
) {
  delete currentIdentity['__typename']
  this.currentIdentityInput = currentIdentity
}

const subscribeToMore = {
  document: gql`
      subscription SubscribeToBullshit {
        subscribeToCurrentIdentity {
          currentIdentity {
            firstName
            lastName
          }
        }
      }
    `,
  updateQuery,
}

export const currentIdentity = {
  query,
  result,
  error,
  skip,
  subscribeToMore,
}
