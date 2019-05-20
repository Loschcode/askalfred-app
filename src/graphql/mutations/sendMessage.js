import gql from 'graphql-tag'

const mutation = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ticket {
        id
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
      update: (store, { data: { sendMessage } }) => {
      }
    })
    .then(({ data: { sendMessage } }) => {
      return sendMessage
    })
  return response
}
