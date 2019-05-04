<template>
  <div
    v-if="currentIdentity"
    class="what-is-your-name"
  >
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>I'm Alfred</h1>
        </div>
      </div>
    </div>

    <!-- What's your name? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="form">
          <div class="form__question">
            <p>What's your name?</p>
          </div>
          <div
            class="form__first-name"
            :class="{ 'transparent-input__error': $v.currentIdentityInput.firstName.$error }"
          >
            <input
              ref="firstName"
              v-model="currentIdentityInput.firstName"
              type="text"
              placeholder="First name"
              @keyup.enter="storeName()"
            >
          </div>
          <div
            class="form__last-name"
            :class="{ 'transparent-input__error': $v.currentIdentityInput.lastName.$error }"
          >
            <input
              ref="lastName"
              v-model="currentIdentityInput.lastName"
              type="text"
              placeholder="Last name"
              @keyup.enter="storeName()"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/getting-started/what-is-your-name.svg">
        </div>
      </div>
    </div>

    <!-- Call To Action -->
    <div class="row center-xs">
      <div class="col-xs-8 col-md-4">
        <div class="confirm">
          <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
            <a
              class="+pointer"
              @click="storeName()"
            >Nice to meet you</a>
          </div>
          <div class="confirm__back">
            <router-link :to="{ path: '/connect/sign-in'}">
              Already have an account?
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import storeIdentityName from '@/graphql/mutations/storeIdentityName'
import { required } from 'vuelidate/lib/validators'
import EventsService from '@/services/EventsService'
import GuestOnlyMixin from '@/mixins/GuestOnlyMixin'

export default {
  name: 'WhatIsYourName',

  mixins: [
    CurrentIdentityMixin,
    GuestOnlyMixin
  ],

  data () {
    return {
      currentIdentityInput: {
        firstName: null,
        lastName: null
      }
    }
  },

  validations: {
    currentIdentityInput: {
      firstName: { required },
      lastName: { required }
    }
  },

  mounted () {
    this.events = new EventsService(this)
    this.currentIdentityInput = {
      firstName: this.currentIdentity.firstName,
      lastName: this.currentIdentity.lastName
    }

    if (this.currentIdentityInput.firstName === null) {
      this.$refs.firstName.focus()
    } else if (this.currentIdentityInput.lastName === null) {
      this.$refs.lastName.focus()
    }
  },

  methods: {
    async storeName () {
      this.$v.currentIdentityInput.$touch()
      if (this.$v.currentIdentityInput.$error) return

      try {
        await storeIdentityName(this, this.currentIdentityInput)
        router.push({ path: '/getting-started/can-i-get-your-email' })
      } catch (error) {
        this.events.error('It was impossible to save your name.')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-top: 4em;
  margin-bottom: 2em;
}

.form {
  input {
    @include transparent-input();
  }
}

.form__question {
  p {
    font-weight: 300;
    font-size: sizing(4);
    margin-bottom: 1em;
  }
}

.form__first-name {
}

.form__last-name {
}

.image {
  padding-top: 3em;
  width: 20vh;
  text-align: center;
  margin: auto;
}

.confirm {
  padding-top: 3em;
}

.confirm__back {
  margin-top: 0.7em;
  a {
    color: $color-white;
  }
}
</style>
