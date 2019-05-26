class CardsHelper {
  cardTypeFrom (value) {
    const cleanCard = value.replace(/\s/g, '')
    const matches = this.cardsMap().filter((card) => { return card.regex.test(cleanCard) })
    if (matches.length > 0) return matches[0]
    return this.cardFallback()
  }

  cardsMap () {
    return [
      {
        mask: '#### #### #### ####',
        regex: /^3[47][0-9]{13}$/,
        type: 'american-express'
      },
      {
        mask: '#### #### #### ####',
        regex: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
        type: 'mastercard'
      },
      {
        mask: '#### #### #### ####',
        regex: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
        type: 'maestro'
      },
      {
        mask: '#### #### #### ####',
        regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
        type: 'visa'
      }
    ]
  }

  cardFallback () {
    return {
      mask: '#### #### #### ####',
      type: 'unknown'
    }
  }
}

export default new CardsHelper()
