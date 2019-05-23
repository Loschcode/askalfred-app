class ErrorsHelper {
  fromType (error, type) {
    return error.graphQLErrors.filter((error) => error.type === type).length > 0
  }
}

export default new ErrorsHelper()
