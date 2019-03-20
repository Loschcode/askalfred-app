<template>
  <div
    class="what-is-your-name"
    v-if="currentIdentity"
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
              type="text"
              placeholder="First name"
              v-model="currentIdentityInput.firstName"
              v-on:keyup.enter="storeName()"
              ref="firstName"
            />
          </div>
          <div
            class="form__last-name"
            :class="{ 'transparent-input__error': $v.currentIdentityInput.lastName.$error }"
          >
            <input
              type="text"
              placeholder="Last name"
              v-model="currentIdentityInput.lastName"
              v-on:keyup.enter="storeName()"
              ref="lastName"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/getting-started/what-is-your-name.svg" />
        </div>
      </div>
    </div>

    <!-- Call To Action -->
    <div class="row center-xs">
      <div class="col-xs-8 col-md-4">
        <div class="confirm">
          <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
            <a
              @click="storeName()"
              class="+pointer"
            >Nice to meet you</a>
          </div>
          <div class="confirm__back">
            <a href="#">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import currentIdentityMixin from '@/mixins/currentIdentityMixin'
import storeIdentityName from '@/graphql/mutations/storeIdentityName'
import { required, minLength, between } from 'vuelidate/lib/validators'
import EventsService from '@/services/EventsService'

export default {
  name: 'WhatIsYourName',

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
    this.currentIdentityInput = _.pick(this.currentIdentity, ['firstName', 'lastName'])

    if (this.firstNameInput  == null) {
      this.$refs.firstName.focus()
    } else if (this.lastNameInput == null) {
      this.$refs.lastName.focus()
    }
  },

  methods: {
    async storeName() {
      this.$v.currentIdentityInput.$touch();
      if (this.$v.currentIdentityInput.$error) return

      try {
        const response = await storeIdentityName(this, this.currentIdentityInput)
      } catch (error) {
        new EventsService(this).error('It was impossible to save your name.')
      }
    }
  },

  mixins: [
    currentIdentityMixin
  ]
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