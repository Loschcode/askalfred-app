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

const subscribeToMore = {
  document: gql`
    subscription SubscribeToBullshit {
      subscribeToBullshit {
        firstName
        lastName
      }
    }
  `,
  // Mutate the previous result
  updateQuery: (previousResult, { subscriptionData }) => {
    console.log('subscription hitting')
    console.log(previousResult)
    console.log(subscriptionData)
  }
}

export const currentIdentity = {
  query: CurrentIdentity,
  subscribeToMore,
  result({ data: { currentIdentity } }) {
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
