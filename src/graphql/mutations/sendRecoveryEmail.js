import gql from 'graphql-tag'

const mutation = gql`
  mutation SendRecoveryEmail($input: SendRecoveryEmailInput!) {
    sendRecoveryEmail(input: $input) {
      currentIdentity {
        id
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
    .then(({ data: { sendRecoveryEmail: { currentIdentity: { email } } } }) => {
      return email
    })
  return response
}
