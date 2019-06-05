<template>
  <div class="thank-you">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Thank you!</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-6">
        <div class="form">
          <div class="form__question">
            <p>I’m about to send you an important email {{ currentIdentity.firstName }}.</p>
            <p>There’s a surprise inside.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="image">
          <img src="/images/getting-started/thank-you.svg">
        </div>
      </div>
    </div>

    <!-- Call To Action -->
    <div class="row center-xs">
      <div class="col-xs-9 col-md-4">
        <div class="confirm">
          <div @click="sendConfirmEmail()">
            <loading-button-white :is-loading="isSendingConfirmEmail">
              Nothing? Send it again
            </loading-button-white>
          </div>
          <div class="confirm__back">
            Please check your <strong>junk or spam folder</strong>. Sometimes it gets stucks there...
          </div>
        </div>
      </div>
    </div>

    <!-- Stuck footer -->
    <div class="row center-xs">
      <div class="footer-placeholder" />
      <div class="footer">
        <router-link :to="{ path: '/connect/sign-out'}">
          Are you stuck? Start all over again
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import NoticesService from '@/services/NoticesService'
import sendConfirmEmail from '@/graphql/mutations/sendConfirmEmail'
import router from '@/router'
import GuestOnlyGuardMixin from '@/mixins/GuestOnlyGuardMixin'
import LoadingButtonWhite from '@/components/Loading/Button/White'

export default {
  name: 'ThankYou',

  components: {
    LoadingButtonWhite
  },

  mixins: [
    CurrentIdentityMixin,
    GuestOnlyGuardMixin
  ],

  props: {
  },

  data () {
    return {
      isSendingConfirmEmail: false
    }
  },

  created () {
    this.notices = new NoticesService(this)

    if (this.currentIdentity.confirmationSentAt === null) {
      this.sendConfirmEmail()
    }
  },

  methods: {
    async sendConfirmEmail () {
      if (this.isSendingConfirmEmail) return

      this.isSendingConfirmEmail = true

      try {
        const identity = await sendConfirmEmail(this, this.notices)
        this.notices.success(`An email with a surprise has been sent to ${identity.email}`)
      } catch (error) {
        router.push({ path: '/' })
        this.notices.graphError(error)
      }

      this.isSendingConfirmEmail = false
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

.image {
  padding-top: 2em;
  width: 20vh;
  text-align: center;
  margin: auto;
}

.confirm {
  padding-top: 3em;
}

.confirm__back {
  margin-top: 0.7em;
  line-height: 20px;
  a {
    color: $color-white;
  }
}
</style>
