import gql from 'graphql-tag'

const mutation = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      ticket {
        id
        status
        title
        messages {
          id
          body
        }
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
      update: (store, { data: { createTicket } }) => {
      }
    })
    .then(({ data: { createTicket } }) => {
      return createTicket
    })
  return response
}
