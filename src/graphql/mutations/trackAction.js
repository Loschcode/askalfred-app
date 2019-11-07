import gql from 'graphql-tag'

const mutation = gql`
  mutation TrackAction($input: TrackActionInput!) {
    trackAction(input: $input) {
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
      update: (store, { data: { trackAction } }) => {
        vm.trackAction = trackAction
      }
    })
    .then(({ data: { trackAction } }) => {
    })
  return response
}
