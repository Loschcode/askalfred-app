import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const query = gql`
  query CurrentIdentity {
    currentIdentity {
      id
      role
      token
      email
      firstName
      lastName
      encryptedPassword
      confirmedAt
      confirmationSentAt
      confirmationToken
      recoverySentAt
      recoveryToken
      credits {
        time
      }
    }
  }
`

const result = function ({ data: { currentIdentity } }) {
  this.currentIdentity = currentIdentity

  if (this.currentIdentity === null && this.identityToken !== null) {
    new EventsService(this).reboot('identity and token mismatch')
  }

  return {
    currentIdentity
  }
}

const error = function () {
  new EventsService(this).crash(
    'We were unable to retrieve the current identity'
  )
}

const skip = function () {
  return this.identityToken === null
}

// Subscription handling
const document = gql`
  subscription SubscribeToIdentity {
    subscribeToCurrentIdentity {
      currentIdentity {
        id
        role
        token
        email
        firstName
        lastName
        confirmedAt
        confirmationSentAt
        credits {
          time
        }
      }
    }
  }
`

const updateQuery = function (
  previousResult,
  {
    subscriptionData: {
      data: {
        subscribeToCurrentIdentity: { currentIdentity }
      }
    }
  }
) {
  let vmCurrentIdentity = Object.assign({}, currentIdentity)
  delete vmCurrentIdentity['__typename']
  this.currentIdentity = vmCurrentIdentity

  return {
    currentIdentity
  }
}

const subscribeToMore = {
  document,
  updateQuery
}

export default {
  query,
  result,
  error,
  skip,
  subscribeToMore
}
