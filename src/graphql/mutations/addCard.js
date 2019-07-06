import gql from 'graphql-tag'

const mutation = gql`
  mutation AddCard($input: AddCardInput!) {
    addCard (input: $input) {
      stripeCustomerId
      stripePaymentMethodId
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
      return addCard
    })
  return response
}
