import gql from 'graphql-tag'

const mutation = gql`
  mutation CreateGuest($input: CreateGuestInput!) {
    createGuest(input: $input) {
      token
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
      update: (store, { data: { createGuest } }) => {
        vm.createGuest = createGuest
      }
    })
    .then(({ data: { createGuest } }) => {
      return createGuest
    })
  return response
}
