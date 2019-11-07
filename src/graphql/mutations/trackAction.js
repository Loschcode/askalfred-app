import gql from 'graphql-tag'

const mutation = gql`
  mutation TrackAction($input: TrackActionInput!) {
    signIn(input: $input) {
      action
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
    .then(({ data: { signIn } }) => {
    })
  return response
}
