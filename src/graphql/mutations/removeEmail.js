import gql from 'graphql-tag'

const mutation = gql`
  mutation RemoveEmail($input: RemoveEmailInput!) {
    removeEmail(input: $input) {
      success
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
      update: (store, { data: { removeEmail } }) => {
        vm.removeEmail = removeEmail
      }
    })
    .then(({ data: { removeEmail: { success } } }) => {
      return success
    })
  return response
}
