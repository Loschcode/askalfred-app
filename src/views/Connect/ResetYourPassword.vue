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
              @keyup.enter="resetPasswordNow()"
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
          <div
            class="+pointer"
            @click="resetPassword()"
          >
            <loading-button-white :is-loading="isResettingPassword">
              I'm all set
            </loading-button-white>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import resetPassword from '@/graphql/mutations/resetPassword'
import { required } from 'vuelidate/lib/validators'
import NoticesService from '@/services/NoticesService'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import LoadingButtonWhite from '@/components/Loading/Button/White'

export default {
  name: 'ResetYourPassword',

  components: {
    LoadingButtonWhite
  },

  mixins: [
    CurrentIdentityMixin
  ],

  props: {
  },

  data () {
    return {
      isResettingPassword: false,
      currentIdentityInput: {
        password: null
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$refs.password.focus()
    })
  },

  validations: {
    currentIdentityInput: {
      password: { required }
    }
  },

  async created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    async resetPasswordNow () {
      this.$v.currentIdentityInput.$touch()
      if (this.$v.currentIdentityInput.$error) return
      if (this.isResettingPassword) return

      this.isResettingPassword = true

      try {
        await resetPassword(this, this.currentIdentityInput)
        this.notices.success(`Welcome back to your dashboard ${this.currentIdentity.firstName}`)
        router.push({ path: '/connect/sign-in' })
      } catch (error) {
        this.notices.graphError(error)
      }

      this.isResettingPassword = false
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
    font-size: sizing(3.8);
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
