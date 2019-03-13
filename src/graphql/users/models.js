import { CreateAnonymousUser, ShowCurrentUser } from '../users/schemas.gql'
import EventsService from '../../services/EventsService'

export const currentUser = {
  query: ShowCurrentUser,
  result({ data }) {},
  error() {
    new EventsService(this).crash('We were unable to retrieve the current user')
  }
}

export const createAnonymousUser = async vm => {
  await vm.$apollo
    .mutate({
      mutation: CreateAnonymousUser,
      variables: {},
      update: (store, { data: { createAnonymousUser } }) => {
        vm.createAnonymousUser = createAnonymousUser
      }
    })
    .then(data => {
      return data
    })
}
