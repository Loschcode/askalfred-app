import gql from 'graphql-tag'

const mutation = gql`
  mutation SendSurpriseEmail {
    sendSurpriseEmail {
      currentIdentity {
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
    .then(({ data: { sendSurpriseEmail: { currentIdentity } } }) => {
      return currentIdentity
    })
  return response
}
