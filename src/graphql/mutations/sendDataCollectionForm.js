import gql from 'graphql-tag'

const mutation = gql`
  mutation SendDataCollectionForm($input: SendDataCollectionFormInput!) {
    sendDataCollectionForm(input: $input) {
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
      update: (store, { data: { sendDataCollectionForm } }) => {
      }
    })
    .then(({ data: { sendDataCollectionForm } }) => {
      return sendDataCollectionForm
    })
  return response
}
