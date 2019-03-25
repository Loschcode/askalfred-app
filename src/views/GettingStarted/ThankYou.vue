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
              @click="sendSurpriseEmail()"
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
import sendSurpriseEmail from '@/graphql/mutations/sendSurpriseEmail'

export default {
  name: 'ThankYou',
  mixins: [
    CurrentIdentityMixin
  ],

  props: {
  },

  created () {
    // TODO : when already sent, don't send if already on this step
    this.sendSurpriseEmail()
  },

  methods: {
    async sendSurpriseEmail () {
      try {
        await sendSurpriseEmail(this)
      } catch (error) {
        new EventsService(this).error('It was impossible to send you an email.')
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
