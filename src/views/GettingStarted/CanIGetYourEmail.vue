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
          <div @click="storeEmail()">
            <loading-button-white :is-loading="isStoringEmail">
              Alright, here it is
            </loading-button-white>
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
import NoticesService from '@/services/NoticesService'
import GuestOnlyGuardMixin from '@/mixins/GuestOnlyGuardMixin'
import LoadingButtonWhite from '@/components/Loading/Button/White'
import TrackingHelper from '@/helpers/TrackingHelper'

export default {
  name: 'CanIGetYourEmail',

  components: {
    LoadingButtonWhite
  },

  mixins: [
    CurrentIdentityMixin,
    GuestOnlyGuardMixin
  ],

  data () {
    return {
      isStoringEmail: false,
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

    this.currentIdentityInput = {
      email: this.currentIdentity.email
    }

    if (this.currentIdentityInput.email === null) {
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
      if (this.isStoringEmail) return

      this.isStoringEmail = true
      try {
        await storeIdentityEmail(this, this.currentIdentityInput)
        TrackingHelper.sharedEmail(this)
        router.push({ path: '/getting-started/thank-you' })
      } catch (error) {
        new NoticesService(this).graphError(error)
      }
      this.isStoringEmail = false
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
