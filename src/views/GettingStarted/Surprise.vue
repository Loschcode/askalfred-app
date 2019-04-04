<template>
  <div class="surprise">
    <div v-if="pageReady()">
      <!-- Title -->
      <div class="row center-xs">
        <div class="col-xs-10">
          <div class="title">
            <h1>Surprise!</h1>
          </div>
        </div>
      </div>

      <!-- I'm glad -->
      <div class="row center-xs">
        <div class="col-xs-10 col-md-6">
          <div class="form">
            <div class="form__question">
              <p>I’m glad you confirmed your email {{ currentIdentity.firstName }}.</p>
              <p>I’ll offer you 20 minutes of my time to try everything by yourself for free.</p>
              <p>Ask me anything.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row center-xs">
        <div class="col-xs-10 col-md-5">
          <div class="image">
            <img src="/images/getting-started/surprise.svg">
          </div>
        </div>
      </div>

      <!-- Call To Action -->
      <div class="row center-xs">
        <div class="col-xs-9 col-md-4">
          <div class="confirm">
            <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
              <a @click="getForFree()">Get 20 minutes for free</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="connect__loading">
        <loading />
      </div>
    </div>
  </div>
</template>

<script>
import confirmEmail from '@/graphql/mutations/confirmEmail'
import router from '@/router'
import getForFree from '@/graphql/mutations/getForFree'
import Loading from '@/components/Loading'
import EventsService from '@/services/EventsService'
import { setTokenAs } from '@/operations/GetTokenOperation'
import currentIdentity from '@/graphql/queries/currentIdentity'

export default {
  name: 'Surprise',
  components: {
    Loading
  },

  props: {
  },

  data () {
    return {
      currentIdentity: null,
      identityToken: null
    }
  },

  async created () {
    this.events = new EventsService(this)

    const confirmationToken = this.$route.query.confirmation_token

    try {
      const token = await confirmEmail(this, { confirmationToken })
      setTokenAs(token)
      this.identityToken = token
    } catch (error) {
      router.push({ path: '/connect/sign-in' })
      this.events.error('You already confirmed your email')
    }
  },

  apollo: {
    currentIdentity
  },

  methods: {
    async getForFree () {
      try {
        await getForFree(this)
        router.push({ path: '/getting-started/do-not-forget' })
        this.events.success('Your credit has been added to your account. Enjoy your 20 minutes!')
      } catch (error) {
        this.events.error('We couldn\'t unwrap your surprise')
      }
    },
    pageReady () {
      return this.currentIdentity
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
  width: 25vh;
  text-align: center;
  margin: auto;
  img {
    margin-left: -2em;
  }
}

.confirm {
  padding-top: 3em;
}

.connect__loading {
  padding-top: 45vh;
}
</style>
