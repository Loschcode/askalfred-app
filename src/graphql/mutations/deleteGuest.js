import gql from 'graphql-tag'

const mutation = gql`
  mutation DeleteGuest($input: DeleteGuestInput!) {
    deleteGuest(input: $input) {
      identity {
        token
      }
    }
  }
`

export default async (vm, input) => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {
        input
      },
      update: (store, { data: { deleteGuest } }) => {
        vm.deleteGuest = deleteGuest
      }
    })
    .then(({ data: { deleteGuest: { identity: { token } } } }) => {
      return token
    })
  return response
}
