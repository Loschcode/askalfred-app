import gql from 'graphql-tag'

const mutation = gql`
  mutation ConfirmEmail($input: ConfirmEmailInput!) {
    confirmEmail(input: $input) {
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
      update: (store, { data: { confirmEmail } }) => {
        vm.confirmEmail = confirmEmail
      }
    })
    .then(({ data: { confirmEmail: { currentIdentity: { token } } } }) => {
      return token
    })
  return response
}
