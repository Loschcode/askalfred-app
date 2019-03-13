import { CreateAnonymousUser, ShowCurrentUser } from '../schemas/User.gql'
import EventsService from '../../services/EventsService'

export const currentUser = {
  query: ShowCurrentUser,
  result({ data }) {
    console.log(data)
    return currentUser
  },
  error(error) {
    new EventsService(this).crash('We were unable to retrieve the current user')
  }
}

export const createAnonymousUser = async vm => {
  return await vm.$apollo
    .mutate({
      mutation: CreateAnonymousUser,
      variables: {},
      update: (store, { data: { createAnonymousUser } }) => {
        vm.createAnonymousUser = createAnonymousUser
      }
    })
    .then(({ data: { createAnonymousUser } }) => {
      return createAnonymousUser
    })
}
