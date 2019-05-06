import gql from 'graphql-tag'

const mutation = gql`
  mutation SendConfirmEmail {
    sendConfirmEmail {
      currentIdentity {
        id
        email
        confirmedAt
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
    .then(({ data: { sendConfirmEmail: { currentIdentity } } }) => {
      return currentIdentity
    })
  return response
}
