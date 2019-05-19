import gql from 'graphql-tag'

const mutation = gql`
  mutation CancelTicket($input: CancelTicketInput!) {
    cancelTicket(input: $input) {
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
      update: (store, { data: { cancelTicket } }) => {
      }
    })
    .then(({ data: { cancelTicket } }) => {
      return cancelTicket
    })
  return response
}
