class StripeHelper {
  addCard ({ cardNumber, expirationDate, securityCode }, callback) {
    if (!this.setKey()) callback(null)

    const number = cardNumber.replace(/\s/g, '')
    const cvc = securityCode
    const expMonth = expirationDate.split('/')[0]
    const expYear = expirationDate.split('/')[1]

    window.Stripe.card.createToken({ number, cvc, expMonth, expYear }, async (status, response) => {
      if (response.error) {
        callback(null)
      } else {
        callback(response.id)
      }
    })
  }

  setKey () {
    try {
      window.Stripe.setPublishableKey(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
      return true
    } catch (error) {
      return false
    }
  }
}

export default new StripeHelper()
