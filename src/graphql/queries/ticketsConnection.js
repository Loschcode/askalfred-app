import gql from 'graphql-tag'
import EventsService from '@/services/EventsService'

const query = gql`
query TicketsConnection(
  $ticketsFirst: Int,
  $messagesFirst: Int
) {
  ticketsConnection(first: $ticketsFirst) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasPreviousPage
      hasNextPage
    }
    nodes {
      id
      status
      messagesConnection(first: $messagesFirst) {
        nodes {
          id
          body
        }
      }
    }
  }
}
`
const variables = function () {
  return {
    ticketsFirst: this.ticketsFirst,
    messagesFirst: 1
  }
}

const result = function ({ data }) {
  return {
    data
  }
}

const error = function (error) {
  new EventsService(this).graphError(error)
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
