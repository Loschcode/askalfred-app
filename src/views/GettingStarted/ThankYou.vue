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
          <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
            <a
              class="+pointer"
              @click="sendConfirmEmail()"
            >Nothing? Send it again</a>
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
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import EventsService from '@/services/EventsService'
import sendConfirmEmail from '@/graphql/mutations/sendConfirmEmail'
import router from '@/router'
import GuestOnlyGuardMixin from '@/mixins/GuestOnlyGuardMixin'

export default {
  name: 'ThankYou',
  mixins: [
    CurrentIdentityMixin,
    GuestOnlyGuardMixin
  ],

  props: {
  },

  created () {
    this.events = new EventsService(this)

    if (this.currentIdentity.confirmationSentAt === null) {
      this.sendConfirmEmail()
    }
  },

  methods: {
    async sendConfirmEmail () {
      try {
        const identity = await sendConfirmEmail(this, this.events)
        this.events.success(`An email with a surprise has been sent to ${identity.email}`)
      } catch (error) {
        router.push({ path: '/' })
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
  a {
    color: $color-white;
  }
}
</style>
