import gql from 'graphql-tag'

const mutation = gql`
  mutation ConfirmEmail($input: ConfirmEmailInput!) {
    confirmEmail(input: $input) {
      identity {
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
    .then(({ data: { confirmEmail: { identity: { token } } } }) => {
      return token
    })
  return response
}
