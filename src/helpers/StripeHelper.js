class StripeHelper {
  addElements (callback) {
    const stripe = this.setStripe()
    if (!stripe) return

    const elements = stripe.elements()

    const style = {
      base: {
        color: 'black',
        fontWeight: 300,
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue',
        fontSize: '24px',
        fontSmoothing: 'antialiased',
        letterSpacing: '0.5px',
        width: '100%',
        border: 'none',
        borderBottom: '1px solid #90a4ae',

        '::placeholder': {
          color: 'grey'
        }
      },
      invalid: {
        color: '#d75a4a',

        '::placeholder': {
          color: '#d75a4a'
        }
      }
    }

    const classes = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid'
    }

    const cardNumber = elements.create('cardNumber', { style, classes })
    cardNumber.mount('#card-number')

    const cardExpiry = elements.create('cardExpiry', { style, classes })
    cardExpiry.mount('#card-expiry')

    const cardCvc = elements.create('cardCvc', { style, classes })
    cardCvc.mount('#card-cvc')

    callback({ cardNumber, cardExpiry, cardCvc }) // eslint-disable-line standard/no-callback-literal
  }

  // addCard ({ cardNumber }, callback) {
  //   const stripe = this.setStripe()
  //   if (!stripe) return

  //   stripe.createToken(cardNumber).then((response) => {
  //     if (response.error) {
  //       callback(null)
  //     } else {
  //       callback(response.token.id)
  //     }
  //   })
  // }

  async addCardAndPay ({ clientSecret, cardNumber, currentIdentity }, callback) {
    const stripe = this.setStripe()
    if (!stripe) return

    const name = `${currentIdentity.firstName} ${currentIdentity.lastName}`

    stripe.handleCardPayment(
      clientSecret, cardNumber, {
        payment_method_data: {
          billing_details: { name }
        }
      }
    ).then(function (result) {
      if (result.error) {
        callback(false) // eslint-disable-line standard/no-callback-literal
      } else {
        callback(result)
      }
    })
  }

  setStripe () {
    try {
      // singleton as we don't want to reinstantiate
      // a different stripe on the same page
      // this would crash the Stripe API.
      if (this.stripe) return this.stripe
      this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
      return this.stripe
    } catch (error) {
      return false
    }
  }
}

export default new StripeHelper()
