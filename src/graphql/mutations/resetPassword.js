import gql from 'graphql-tag'

const mutation = gql`
  mutation ResetPassword ($input: ResetPasswordInput!) {
    resetPassword (input: $input) {
      currentIdentity {
        id
        encryptedPassword
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
      update: (store, { data: { resetPassword } }) => {
      }
    })
    .then(({ data: { resetPassword } }) => {
      return resetPassword
    })
  return response
}
