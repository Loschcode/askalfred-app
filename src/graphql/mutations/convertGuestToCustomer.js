import gql from 'graphql-tag'

// NOTE : always keep ID it helps
// refreshing the Apollo cache
const mutation = gql`
  mutation ConvertGuestToCustomer {
    convertGuestToCustomer {
      currentIdentity {
        id
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
      update: (store, { data: { convertGuestToCustomer: { currentIdentity } } }) => {
      }
    })
    .then(({ data: { convertGuestToCustomer: { currentIdentity } } }) => {
    })
  return response
}
