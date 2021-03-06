<template>
  <div class="surprise">
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
            <p>I'll offer you some of my time to try everything by yourself for free. Ask me anything.</p>
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
          <div @click="getCreditForFree()">
            <loading-button-white :is-loading="isGettingCredit">
              Get 20 minutes for free
            </loading-button-white>
          </div>
          <div class="confirm__back">
            You hereby accept our <a
              href="/pages/terms-of-use"
              target="_blank"
            >Terms of Use</a> as well as our
            <a
              href="/pages/privacy-policy"
              target="_blank"
            >Privacy Policy</a> by going further.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import getCreditForFree from '@/graphql/mutations/getCreditForFree'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import NoticesService from '@/services/NoticesService'
import GuestOnlyGuardMixin from '@/mixins/GuestOnlyGuardMixin'
import LoadingButtonWhite from '@/components/Loading/Button/White'
import TrackingHelper from '@/helpers/TrackingHelper'

export default {
  name: 'Surprise',

  components: {
    LoadingButtonWhite
  },

  mixins: [
    CurrentIdentityMixin,
    GuestOnlyGuardMixin
  ],

  data () {
    return {
      isGettingCredit: false
    }
  },

  created () {
    this.notices = new NoticesService(this)

    if (this.wrongStep()) return router.push({ path: '/getting-started/' })
  },

  methods: {
    wrongStep () {
      if (!this.currentIdentity.confirmedAt) return true
      return false
    },

    async getCreditForFree () {
      if (this.isGettingCredit) return
      this.isGettingCredit = true

      try {
        await getCreditForFree(this)
        this.notices.success('Your credit has been added to your account. Enjoy your 20 minutes!')
        TrackingHelper.gotFreeTime(this)
        router.push({ path: '/getting-started/do-not-forget' })
      } catch (error) {
        this.notices.graphError(error)
      }
      this.isGettingCredit = false
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
    font-size: sizing(3.1);
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

.confirm__back {
  margin-top: 0.7em;
  line-height: 20px;
  a {
    color: $color-white;
    padding-bottom: 0.2em;
    line-height: 15px;
    font-weight: bold;
  }
}
</style>
