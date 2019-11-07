class TrackingHelper {
  clickedToIntroduce (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Clicked to introduce'
    })
  }

  sharedName (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Shared name'
    })
  }

  sharedEmail (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Shared email'
    })
  }

  confirmedEmail (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Confirmed email'
    })
  }

  gotFreeTime (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Got free time'
    })
  }

  fullySignedUp (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Fully signed up'
    })
  }

  signedInManually (vm) {
    this.track(vm, {
      category: 'Connect',
      action: 'Signed in manually'
    })
  }

  signedOutManually (vm) {
    this.track(vm, {
      category: 'Connect',
      action: 'Signed out manually'
    })
  }

  gotStuck (vm) {
    this.track(vm, {
      category: 'Getting started',
      action: 'Got stuck and reset the process'
    })
  }

  clickedToMakeFirstRequest (vm) {
    this.track(vm, {
      category: 'Clicked to make first request',
      action: 'Clicked to make first request'
    })
  }

  sentFirstRequest (vm) {
    this.track(vm, {
      category: 'Tickets',
      action: 'Made first request'
    })
  }

  selectedPayment (vm, amount) {
    this.track(vm, {
      category: 'Payment',
      action: 'Selected payment',
      value: amount
    })
  }

  clickedToPay (vm, amount) {
    this.track(vm, {
      category: 'Payment',
      action: 'Clicked to pay',
      value: amount
    })
  }

  addedCard (vm, amount) {
    this.track(vm, {
      category: 'Payment',
      action: 'Added card',
      value: amount
    })
  }

  paidFully (vm, amount) {
    this.track(vm, {
      category: 'Payment',
      action: 'Paid fully',
      value: amount
    })
  }

  identify (vm, { id, email, firstName, lastName }) {
    vm.$ga.set({ id })
  }

  track (vm, { category, action, label, value }) {

    // HERE YOU TRACK IT

    vm.$ga.event({
      eventCategory: category || '',
      eventAction: action || '',
      eventLabel: label || action,
      eventValue: value || 0
    })
  }
}

export default new TrackingHelper()
