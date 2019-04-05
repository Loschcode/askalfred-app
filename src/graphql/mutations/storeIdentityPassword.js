import gql from 'graphql-tag'

const mutation = gql`
  mutation StoreIdentityPassword ($input: StoreIdentityPasswordInput!) {
    storeIdentityPassword (input: $input) {
      encryptedPassword
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
      update: (store, { data: { storeIdentityPassword } }) => {
        vm.storeIdentityPassword = storeIdentityPassword
      }
    })
    .then(({ data: { storeIdentityPassword } }) => {
      return storeIdentityPassword
    })
  return response
}
