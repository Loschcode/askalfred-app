import gql from 'graphql-tag'

const mutation = gql`
  mutation ConvertGuestToCustomer {
    convertGuestToCustomer {
      currentIdentity {
        role
      }
    }
  }
`

export default async (vm, events) => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {},
      update: (store, { data }) => {
      }
    })
    .then(({ data: { convertGuestToCustomer: { currentIdentity } } }) => {
      return currentIdentity
    })
  return response
}
