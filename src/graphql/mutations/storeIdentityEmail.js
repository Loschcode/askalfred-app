import gql from 'graphql-tag'

const mutation = gql`
  mutation StoreIdentityEmail($input: StoreIdentityEmailInput!) {
    storeIdentityEmail(input: $input) {
      currentIdentity {
        id
        email
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
      update: (store, { data: { storeIdentityEmail } }) => {
        // vm.storeIdentityEmail = storeIdentityEmail
        // Object.assign(vm.currentIdentity, storeIdentityEmail)
      }
    })
    .then(({ data: { storeIdentityEmail } }) => {
      return storeIdentityEmail
    })
  return response
}
