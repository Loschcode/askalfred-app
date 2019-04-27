import gql from 'graphql-tag'

const mutation = gql`
  mutation GetCreditForFree {
    getCreditForFree {
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
      update: (store, { data: { getCreditForFree } }) => {
      }
    })
    .then(({ data: { getCreditForFree } }) => {
      return getCreditForFree
    })
  return response
}
