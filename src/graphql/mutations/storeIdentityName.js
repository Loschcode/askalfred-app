import gql from 'graphql-tag'

const mutation = gql`
  # input StoreIdentityNameInput {
  #   firstName: String!
  #   lastName: String!
  # }

  mutation StoreIdentityName($input: StoreIdentityNameInput!) {
    storeIdentityName(input: $input) {
      id
      firstName
      lastName
    }
  }
`

export default async vm => {
  return await vm.$apollo
    .mutate({
      mutation,
      variables: {
        input: {
          firstName: vm.firstName,
          lastName: vm.lastName
        }
      },
      update: (store, { data: { storeIdentityName } }) => {
        vm.storeIdentityName = storeIdentityName
      }
    })
    .then(({ data: { storeIdentityName } }) => {
      return storeIdentityName
    })
}
