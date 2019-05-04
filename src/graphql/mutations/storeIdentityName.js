import gql from 'graphql-tag'
import _ from 'lodash'

const mutation = gql`
  mutation StoreIdentityName($input: StoreIdentityNameInput!) {
    storeIdentityName(input: $input) {
      firstName
      lastName
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
      update: (store, { data: { storeIdentityName } }) => {
        vm.storeIdentityName = storeIdentityName
        Object.assign(vm.currentIdentity, storeIdentityName)
      }
    })
    .then(({ data: { storeIdentityName } }) => {
      return storeIdentityName
    })
  return response
}
