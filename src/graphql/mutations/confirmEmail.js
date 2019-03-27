import gql from 'graphql-tag'

// TODO : need fragment to avoid repeat yourself when you  get the whole guest current identity
const mutation = gql`
  mutation ConfirmEmail($input: ConfirmEmailInput!) {
    confirmEmail(input: $input) {
      currentIdentity {
        id
        role
        token
        email
        firstName
        lastName
        confirmedAt
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
    .then(({ data: { confirmEmail: { currentIdentity } } }) => {
      return currentIdentity
    })
  return response
}
