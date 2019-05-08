import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const query = gql`
  query TicketsList($ticketsListInput: TicketsListInput, $eventMessageInput: EventMessageInput) {
    ticketsList(input: $ticketsListInput) {
      items {
        id
        status
        title
        messages(input: $eventMessageInput) {
          id
          body
        }
      }
      pageInfo {
        totalCount
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

const variables = function () {
  return {
    eventMessageInput: {
      limit: 1
    },
    ticketsListInput: this.ticketsListInput
  }
}

const result = function ({ data }) {
  return {
    data
  }
}

const error = function () {
  new EventsService(this).error(
    'We were unable to retrieve the tickets list'
  )
}

const skip = function () {
  return false
}

// Subscription handling
// const document = gql`
//   subscription SubscribeToIdentity {
//     subscribeToTickets {
//       tickets {
//         id
//         title
//         status
//         messages {
//           body
//         }
//       }
//     }
//   }
// `

// const updateQuery = function (
//   previousResult,
//   {
//     subscriptionData: {
//       data: {
//         subscribeToTickets: { tickets }
//       }
//     }
//   }
// ) {
//   let vmTickets = Object.assign({}, tickets)
//   delete vmTickets['__typename']
//   this.tickets = vmTickets

//   return {
//     tickets
//   }
// }

// const subscribeToMore = {
//   document,
//   updateQuery
// }

export default {
  query,
  variables,
  result,
  error,
  skip
  // subscribeToMore
}
