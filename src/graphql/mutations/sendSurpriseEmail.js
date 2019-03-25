import gql from 'graphql-tag'

const mutation = gql`
  mutation SendSurpriseEmail {
    sendSurpriseEmail {
      currentIdentity {
        confirmedAt
      }
    }
  }
`

export default async vm => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {},
      update: (store, { data: { sendSurpriseEmail } }) => {
        vm.sendSurpriseEmail = sendSurpriseEmail
      }
    })
    .then(({ data: { sendSurpriseEmail } }) => {
      return sendSurpriseEmail
    })
  return response
}
