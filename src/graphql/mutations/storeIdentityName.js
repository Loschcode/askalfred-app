import gql from 'graphql-tag'

const mutation = gql`
  # input StoreIdentityNameInput {
  #   firstName: String!
  #   lastName: String!
  # }

  mutation StoreIdentityName($input: StoreIdentityNameInput!) {
    storeIdentityName(input: $input) {
      firstName
      lastName
    }
  }
`

export default async (vm, input) => {
  return await vm.$apollo
    .mutate({
      mutation,
      variables: {
        input
      },
      update: (store, { data: { storeIdentityName } }) => {
        vm.storeIdentityName = storeIdentityName
      }
    })
    .then(({ data: { storeIdentityName } }) => {
      return storeIdentityName
    })
}
