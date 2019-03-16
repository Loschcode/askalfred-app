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
