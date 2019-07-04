import gql from 'graphql-tag'

const mutation = gql`
  mutation SetPaymentIntent($input: SetPaymentIntentInput!) {
    setPaymentIntent (input: $input) {
      stripePaymentIntentId
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
      update: (store, { data: { setPaymentIntent } }) => {
      }
    })
    .then(({ data: { setPaymentIntent } }) => {
      return setPaymentIntent
    })
  return response
}
