import gql from 'graphql-tag'
import EventsService from '../../services/EventsService'

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
  result({ data }) {
    console.log(data)
    return currentIdentity
  },
  error(error) {
    new EventsService(this).crash('We were unable to retrieve the current user')
  }
}
