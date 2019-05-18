import gql from 'graphql-tag'

const mutation = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      ticketsConnection {
        totalCount
        pageInfo {
          endCursor
          startCursor
          hasPreviousPage
          hasNextPage
        }
        nodes {
          id
          title
          subject
          status
          messagesConnection {
            nodes {
              id
              body
            }
          }
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
        // store.ticketsConnection = store.ticketsConnection.concat(createTicket.ticketsConnection.nodes)
      }
    })
    .then(({ data: { createTicket } }) => {
      return createTicket
    })
  return response
}
