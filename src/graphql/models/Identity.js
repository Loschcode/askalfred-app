import { CreateGuest, CurrentIdentity } from '../schemas/Identity.gql'
import EventsService from '../../services/EventsService'

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

export const createGuest = async vm => {
  return await vm.$apollo
    .mutate({
      mutation: CreateGuest,
      variables: {},
      update: (store, { data: { createGuest } }) => {
        vm.createGuest = createGuest
      }
    })
    .then(({ data: { createGuest } }) => {
      return createGuest
    })
}
