import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const mutation = gql`
  mutation SendSurpriseEmail {
    sendSurpriseEmail {
      currentIdentity {
        confirmedAt
      }
    }
  }
`

export default async vm => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {},
      update: (store, { data: { currentIdentity } }) => {
        // TODO : here we can manage the update of
        // the currentIdentity with updated sent email
      }
    })
    .then(({ data: { currentIdentity } }) => {
      new EventsService(vm).success(`An email with a surprise has been sent to ${vm.currentIdentity.email}`)
      return currentIdentity
    })
  return response
}
