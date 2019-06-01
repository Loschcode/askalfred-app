<template>
  <div class="emails-unsubscribe">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>We're sorry to hear that ...</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-7">
        <div class="form">
          <div class="unsubscribe">
            <p>Can you tell us what went wrong?</p>

            <textarea
              ref="reason"
              v-model="reason"
              name="reason"
              placeholder="Too many emails? Display issues? Not willing to hear of Alfred? Do not hesitate to tell us more."
            />

            <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
              <a
                class="+pointer"
                @click="confirmUnsubscribe()"
              >remove my email from the list now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import TextareaHelper from '@/helpers/TextareaHelper'
import removeEmail from '@/graphql/mutations/removeEmail'
import NoticesService from '@/services/NoticesService'

export default {
  name: 'EmailsUnsubscribe',
  props: {
  },

  data () {
    return {
      reason: ''
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  mounted () {
    TextareaHelper.autosize()
  },

  methods: {
    async confirmUnsubscribe () {
      try {
        const email = this.$route.query.email
        const reason = this.reason
        await removeEmail(this, { email, reason })
        this.notices.success(`Your email ${email} has been removed from our list`)
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
  h1 {
    font-size: sizing(8);
  }
}

.unsubscribe {
  p {
    font-size: sizing(2.7);
    text-align: justify;
    margin-bottom: 1em;
  }

  textarea {
    height: 10em;
    border-radius: 2px;
    font-size: 18px;
    padding: 0.8em;
    margin-bottom: 1em;
    width: 100%;
    border: 0px;
    &::placeholder {
      color: $color-grey;
    }
  }
}
</style>
