import gql from 'graphql-tag'

const mutation = gql`
  mutation AddCard($input: AddCardInput!) {
    addCard (input: $input) {
      stripeCustomerId
      stripeCardId
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
      update: (store, { data: { addCard } }) => {
      }
    })
    .then(({ data: { addCard } }) => {
      debugger
      return addCard
    })
  return response
}
