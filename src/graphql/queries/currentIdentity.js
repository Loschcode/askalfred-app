import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'
import _ from 'lodash'

const CurrentIdentity = gql`
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

export const currentIdentity = {
  query: CurrentIdentity,
  subscribeToMore: {
    document: gql`
      subscription SubscribeToBullshit {
        subscribeToCurrentIdentity {
          firstName
          lastName
        }
      }
    `,
    // Mutate the previous result
    updateQuery(
      previousResult,
      {
        subscriptionData: {
          data: { subscribeToCurrentIdentity }
        }
      }
    ) {
      this.firstNameInput = subscribeToCurrentIdentity.firstName
      this.lastNameInput = subscribeToCurrentIdentity.lastName
    }
  },
  result({ data: { currentIdentity } }) {
    this.currentIdentity = currentIdentity
    return currentIdentity
  },
  error(error) {
    new EventsService(this).crash(
      'We were unable to retrieve the current identity'
    )
  },
  skip() {
    return this.identityToken == null
  }
}
