import gql from 'graphql-tag'

const mutation = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
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
      update: (store, { data: { signIn } }) => {
        vm.signIn = signIn
      }
    })
    .then(({ data: { signIn: { token } } }) => {
      return token
    })
  return response
}
