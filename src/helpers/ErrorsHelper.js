import * as Sentry from '@sentry/browser'

class ErrorsHelper {
  fromType (error, type) {
    return error.graphQLErrors.filter((error) => error.type === type).length > 0
  }

  transmit (level, error) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.configureScope((scope) => {
        scope.setExtra('level', level)
        if (typeof error === 'string') {
          Sentry.captureMessage(error)
        } else {
          Sentry.captureException(error)
        }
      })
    }
  }

  setContext ({ identity }) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.configureScope((scope) => {
        scope.setUser({
          id: identity.id,
          email: identity.email
        })
      })
    }
  }
}

export default new ErrorsHelper()
