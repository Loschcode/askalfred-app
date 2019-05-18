<template>
  <div class="do-not-forget">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Don't forget</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="form">
          <div class="form__question">
            <p>Now that you got some time with me, you need a password to secure your account</p>
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
              @keyup.enter="storePassword()"
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
              @click="storePassword()"
            >I'm all set</a>
          </div>
        </div>
        <div class="confirm__back">
          <router-link :to="{ path: '/connect/sign-in'}">
            I've already done it
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import storeIdentityPassword from '@/graphql/mutations/storeIdentityPassword'
import convertGuestToCustomer from '@/graphql/mutations/convertGuestToCustomer'
import { required } from 'vuelidate/lib/validators'
import NoticesService from '@/services/NoticesService'
import GuestOnlyGuardMixin from '@/mixins/GuestOnlyGuardMixin'

export default {
  name: 'DoNotForget',

  mixins: [
    CurrentIdentityMixin,
    GuestOnlyGuardMixin
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

  created () {
    this.notices = new NoticesService(this)
  },

  mounted () {
    this.currentIdentityInput = {
      password: this.currentIdentity.password
    }

    if (!this.currentIdentityInput.password) {
      this.$refs.password.focus()
    } else {
      router.push({ path: '/' })
      this.notices.error('You have already set your password.')
    }
  },

  methods: {
    async storePassword () {
      this.$v.currentIdentityInput.$touch()
      if (this.$v.currentIdentityInput.$error) return

      try {
        await storeIdentityPassword(this, this.currentIdentityInput)
        await convertGuestToCustomer(this)
        this.notices.success(`Welcome to your dashboard ${this.currentIdentity.firstName}`)
        router.push({ path: '/connect/sign-in' })
      } catch (error) {
        this.notices.graphError(error)
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

.confirm__back {
  margin-top: 0.7em;
  a {
    color: $color-white;
  }
}
</style>
