import gql from 'graphql-tag'

const mutation = gql`
  mutation UnsetPassword($input: UnsetPasswordInput!) {
    unsetPassword(input: $input) {
      currentIdentity {
        token
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
      update: (store, { data: { unsetPassword } }) => {
        vm.unsetPassword = unsetPassword
      }
    })
    .then(({ data: { unsetPassword: { currentIdentity: { token } } } }) => {
      return token
    })
  return response
}
