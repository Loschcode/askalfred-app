import gql from 'graphql-tag'

const mutation = gql`
  mutation SendFile($input: SendFileInput!) {
    sendFile(input: $input) {
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
      update: (store, { data: { sendFile } }) => {
      }
    })
    .then(({ data: { sendFile } }) => {
      return sendFile
    })
  return response
}
