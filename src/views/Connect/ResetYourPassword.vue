<template>
  <div class="do-not-forget">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Set a new password</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="form">
          <div class="form__question">
            <p>You can now set a fresh password to your account {{ currentIdentity.firstName }}</p>
          </div>
          <div
            class="form__password"
            :class="{ 'transparent-input__error': $v.currentIdentityInput.password.$error }"
          >
            <input
              ref="password"
              v-model="currentIdentityInput.password"
              type="password"
              placeholder="Password"
              @keyup.enter="resetPassword()"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/getting-started/do-not-forget.svg">
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
              @click="resetPassword()"
            >I'm all set</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import storeIdentityPassword from '@/graphql/mutations/storeIdentityPassword'
import { required } from 'vuelidate/lib/validators'
import EventsService from '@/services/EventsService'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'ResetYourPassword',

  mixins: [
    CurrentIdentityMixin
  ],

  props: {
  },

  data () {
    return {
      currentIdentityInput: {
        password: null
      }
    }
  },

  validations: {
    currentIdentityInput: {
      password: { required }
    }
  },

  async created () {
    this.events = new EventsService(this)
  },

  methods: {
    async resetPassword () {
      this.$v.currentIdentityInput.$touch()
      if (this.$v.currentIdentityInput.$error) return

      try {
        await storeIdentityPassword(this, this.currentIdentityInput)
        new EventsService(this).success(`Welcome back to your dashboard ${this.currentIdentity.firstName}`)
        router.push({ path: '/connect/sign-in' })
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

.form__password {
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
</style>