import gql from 'graphql-tag'

const mutation = gql`
  mutation ChargeCustomer($input: ChargeCustomerInput!) {
    chargeCustomer (input: $input) {
      stripeIntentId
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
      update: (store, { data: { chargeCustomer } }) => {
      }
    })
    .then(({ data: { chargeCustomer } }) => {
      return chargeCustomer
    })
  return response
}
