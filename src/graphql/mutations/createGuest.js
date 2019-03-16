import gql from 'graphql-tag'

const mutation = gql`
  mutation CreateGuest {
    createGuest {
      token
    }
  }
`

export default async vm => {
  return await vm.$apollo
    .mutate({
      mutation,
      variables: {},
      update: (store, { data: { createGuest } }) => {
        vm.createGuest = createGuest
      }
    })
    .then(({ data: { createGuest } }) => {
      return createGuest
    })
}
