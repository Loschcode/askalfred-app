<template>
  <div class="can-i-get-your-email">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>I'm delighted to meet you</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="form">
          <div class="form__question">
            <p>Can I get your email?</p>
          </div>
          <div class="form__email">
            <input
              ref="email"
              v-model="currentIdentityInput.email"
              type="email"
              placeholder="Email"
              @keyup.enter="storeEmail()"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/getting-started/can-i-get-your-email.svg">
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
              @click="storeEmail()"
            >Alright, here it is</a>
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
import storeIdentityEmail from '@/graphql/mutations/storeIdentityEmail'
import { required } from 'vuelidate/lib/validators'
import EventsService from '@/services/EventsService'

export default {
  name: 'CanIGetYourEmail',

  mixins: [
    CurrentIdentityMixin
  ],

  data () {
    return {
      currentIdentityInput: {
        email: null
      }
    }
  },

  validations: {
    currentIdentityInput: {
      email: { required }
    }
  },

  mounted () {
    if (this.wrongStep()) return router.push({ path: '/getting-started/' })

    this.currentIdentityInput = _.pick(this.currentIdentity, ['email'])

    if (this.emailInput == null) {
      this.$refs.email.focus()
    }
  },

  methods: {
    wrongStep () {
      if (!this.currentIdentity.firstName) return true
      if (!this.currentIdentity.lastName) return true

      return false
    },

    async storeEmail () {
      this.$v.currentIdentityInput.$touch()
      if (this.$v.currentIdentityInput.$error) return

      try {
        await storeIdentityEmail(this, this.currentIdentityInput)
        router.push({ path: '/getting-started/thank-you' })
      } catch (error) {
        new EventsService(this).graphError(error)
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

.form__email {
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
