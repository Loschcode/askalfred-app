<template>
  <div class="sitemap">
    <h3>Connect</h3>
    <router-link to="/connect/sign-in">SignIn</router-link>
    <br />
    <router-link to="/connect/forgot-your-password">ForgotYourPassword</router-link>

    <h3>Getting Started</h3>
    <router-link to="/getting-started/what-is-your-name">WhatIsYourName</router-link>
    <br />
    <router-link to="/getting-started/can-i-get-your-email">CanIGetYourEmail</router-link>
    <br />
    <router-link to="/getting-started/thank-you">ThankYou</router-link>
    <br />
    <router-link to="/getting-started/surprise">Surprise</router-link>
    <br />
    <router-link to="/getting-started/do-not-forget">DoNotForget</router-link>

    <h3>Pages</h3>
    <router-link to="/pages/legal-mentions">LegalMentions</router-link>
    <br />

    <br />

  </div>
</template>

<script>
import { currentIdentity } from '@/graphql/queries/currentIdentity'

export default {
  name: 'Sitemap',
  data () {
    return {
      currentIdentity: null
    }
  },
  apollo: {
    currentIdentity
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang='scss'>
h3 {
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.sitemap {
  a {
    color: $color-white;
  }
}
</style>