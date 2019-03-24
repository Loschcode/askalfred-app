import gql from 'graphql-tag'

const mutation = gql`
  mutation StoreIdentityEmail($input: StoreIdentityEmailInput!) {
    storeIdentityEmail(input: $input) {
      email
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
      update: (store, { data: { storeIdentityEmail } }) => {
        vm.storeIdentityEmail = storeIdentityEmail
      }
    })
    .then(({ data: { storeIdentityEmail } }) => {
      return storeIdentityEmail
    })
  return response
}
