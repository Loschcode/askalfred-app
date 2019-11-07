import trackAction from '@/graphql/mutations/trackAction'

class TrackingHelper {
  clickedToIntroduce (vm) {
    this.track(vm, 'clickedToIntroduce', {
      category: 'Getting started',
      action: 'Clicked to introduce'
    })
  }

  sharedName (vm) {
    this.track(vm, 'sharedname', {
      category: 'Getting started',
      action: 'Shared name'
    })
  }

  sharedEmail (vm) {
    this.track(vm, 'sharedEmail', {
      category: 'Getting started',
      action: 'Shared email'
    })
  }

  confirmedEmail (vm) {
    this.track(vm, 'confirmedEmail', {
      category: 'Getting started',
      action: 'Confirmed email'
    })
  }

  gotFreeTime (vm) {
    this.track(vm, 'gotFreeTime', {
      category: 'Getting started',
      action: 'Got free time'
    })
  }

  fullySignedUp (vm) {
    this.track(vm, 'fullySignedUp', {
      category: 'Getting started',
      action: 'Fully signed up'
    })
  }

  signedInManually (vm) {
    this.track(vm, 'signedInManually', {
      category: 'Connect',
      action: 'Signed in manually'
    })
  }

  signedOutManually (vm) {
    this.track(vm, 'signedOutManually', {
      category: 'Connect',
      action: 'Signed out manually'
    })
  }

  gotStuck (vm) {
    this.track(vm, 'gotStuck', {
      category: 'Getting started',
      action: 'Got stuck and reset the process'
    })
  }

  clickedToMakeFirstRequest (vm) {
    this.track(vm, 'clickedToMakeFirstRequest', {
      category: 'Clicked to make first request',
      action: 'Clicked to make first request'
    })
  }

  sentFirstRequest (vm) {
    this.track(vm, 'sendFirstRequest', {
      category: 'Tickets',
      action: 'Made first request'
    })
  }

  selectedPayment (vm, amount) {
    this.track(vm, 'selectedPayment', {
      category: 'Payment',
      action: 'Selected payment',
      value: amount
    })
  }

  clickedToPay (vm, amount) {
    this.track(vm, 'clickedToPay', {
      category: 'Payment',
      action: 'Clicked to pay',
      value: amount
    })
  }

  addedCard (vm, amount) {
    this.track(vm, 'addedCard', {
      category: 'Payment',
      action: 'Added card',
      value: amount
    })
  }

  paidFully (vm, amount) {
    this.track(vm, 'paidFully', {
      category: 'Payment',
      action: 'Paid fully',
      value: amount
    })
  }

  identify (vm, { id, email, firstName, lastName }) {
    vm.$ga.set({ id })
  }

  async track (vm, method, { category, action, label, value }) {
    const event = { method, category, action, label, value }
    await trackAction(vm, { method, event })

    vm.$ga.event({
      eventCategory: category || '',
      eventAction: action || '',
      eventLabel: label || action,
      eventValue: value || 0
    })
  }
}

export default new TrackingHelper()
