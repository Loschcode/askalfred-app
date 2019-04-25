import gql from 'graphql-tag'

const mutation = gql`
  mutation SendRecoveryEmail($input: SendRecoveryEmailInput!) {
    sendRecoveryEmail(input: $input) {
      currentIdentity {
        email
      }
    }
  }
`

export default async (vm, input) => {
  const response = await vm.$apollo
    .mutate({
      mutation,
      variables: {
        input
      },
      update: (store, { data: { sendRecoveryEmail } }) => {
        vm.sendRecoveryEmail = sendRecoveryEmail
      }
    })
    .then(({ data: { sendRecoveryEmail: { currentIdentity: { token } } } }) => {
      return token
    })
  return response
}
