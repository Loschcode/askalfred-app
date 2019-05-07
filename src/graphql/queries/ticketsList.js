import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const query = gql`
  query TicketsList($eventMessageInput: EventMessageInput) {
    ticketsList {
      id
      status
      messages(input: $eventMessageInput) {
        id
        body
      }
    }
  }
`

const variables = {
  eventMessageInput: {
    limit: 1
  }
}

const result = function ({ data: { tickets } }) {
  this.tickets = tickets

  return {
    tickets
  }
}

const error = function () {
  new EventsService(this).crash(
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
