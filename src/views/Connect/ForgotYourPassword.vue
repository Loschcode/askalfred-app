<template>
  <div class="forgot-your-password">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Forgot your password?</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="form">
          <div class="form__question">
            <p>Please write down your email so I can send you a reset</p>
          </div>
          <div
            class="form__email"
            :class="{ 'transparent-input__error': $v.email.$error }"
          >
            <input
              ref="email"
              v-model="email"
              type="email"
              placeholder="Email"
              @keyup.enter="resetPassword()"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/connect/forgot-your-password.svg">
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
            >Confirm email</a>
          </div>
          <div class="confirm__back">
            <a @click="goBack()">Back</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import EventsService from '@/services/EventsService'
import sendRecoveryEmail from '@/graphql/mutations/sendRecoveryEmail'
import router from '@/router'

export default {
  name: 'ForgotYourPassword',
  props: {
  },

  data () {
    return {
      email: null
    }
  },

  validations: {
    email: { required }
  },

  created () {
    this.events = new EventsService(this)
  },

  methods: {
    goBack () {
      router.go(-1) || router.push({ path: '/connect/sign-in' })
    },

    async resetPassword () {
      this.$v.email.$touch()
      if (this.$v.email.$error) return

      try {
        const email = this.email
        const responseEmail = await sendRecoveryEmail(this, { email })
        this.events.success(`An email has been sent to ${responseEmail}`)
        router.push({ path: '/connect/sign-in' })
      } catch (error) {
        this.events.graphError(error)
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
  width: 19vh;
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
