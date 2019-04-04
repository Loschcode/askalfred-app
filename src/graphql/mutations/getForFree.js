import gql from 'graphql-tag'

const mutation = gql`
  mutation GetForFree {
    getForFree {
      credit {
        time
      }
    }
  }
`

export default async (vm) => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {},
      update: (store, { data: { getForFree } }) => {
      }
    })
    .then(({ data: { getForFree } }) => {
      return getForFree
    })
  return response
}
