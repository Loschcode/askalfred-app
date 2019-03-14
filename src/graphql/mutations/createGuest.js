import gql from 'graphql-tag'

const mutation = gql`
  mutation CreateGuest {
    createGuest {
      token
    }
  }
`

// const variables = {}

// const update = (store, { data: { createGuest } }) => {
//   vm.createGuest = createGuest
// }

// const then = ({ data: { createGuest } }) => {
//   return createGuest
// }

// const mutate = {
//   mutation,
//   variables,
//   update
// }

// export default async vm => {
//   return await vm.$apollo.mutate(mutate).then(then)
// }

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
