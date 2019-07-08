import gql from 'graphql-tag'

const mutation = gql`
  mutation SetSetupIntent {
    setSetupIntent {
      id
      clientSecret
    }
  }
`

export default async (vm) => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {
      },
      update: (store, { data: { setSetupIntent } }) => {
      }
    })
    .then(({ data: { setSetupIntent } }) => {
      return setSetupIntent
    })
  return response
}
