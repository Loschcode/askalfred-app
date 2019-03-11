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
    <a
      @click="getToken()"
      href="#"
    >{{ books }}</a>

    {{ token }}

  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Sitemap',
  data () {
    return {
      token: null
    }
  },
  apollo: {
    books: {
      query: gql`query GetBook {
        books {
          title
          author
        }
      }`
    }
  },
  methods: {
    async getToken() {
      this.email = 'test@test.com'
      this.password = 'password'
      return await this.$apollo.mutate({
        mutation: gql`mutation ($input: GetIdentityTokenInput!) {
          getIdentityToken(input: $input) {
            token
          }
        }`,
        variables: {
          input: {
            email: this.email,
            password: this.password
          }
        },
      }).then((data) => {
        this.token = data.data.getIdentityToken.token
      })
    },
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