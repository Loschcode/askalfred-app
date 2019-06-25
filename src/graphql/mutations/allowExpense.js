import gql from 'graphql-tag'

const mutation = gql`
  mutation AllowExpense($input: AllowExpenseInput!) {
    allowExpense(input: $input) {
      success
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
      update: (store, { data: { allowExpense } }) => {
      }
    })
    .then(({ data: { allowExpense } }) => {
      return allowExpense
    })
  return response
}
