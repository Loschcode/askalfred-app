<template>
  <div class="default-error">
    <div class="row center-xs">
      <div class="col-xs-8">
        <div class="image">
          <img src="/images/errors/warning-for-blue.svg">
        </div>
      </div>
    </div>
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="content">
          <div class="content__title">
            <h1>Oops! Page not found</h1>
          </div>
          <div class="content__message">
            The page you requested does not exist
          </div>
        </div>
      </div>
    </div>
    <div class="row center-xs">
      <div class="col-xs-8 col-sm-7 col-md-5 col-lg-3">
        <div class="call-to-action">
          <div class="content__button">
            <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
              <a @click="goHome()">Back to home page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHelper from '@/helpers/PageHelper'

export default {
  name: 'ErrorNotFound',
  props: {
    error: {
      value: {},
      type: Object,
      required: true
    }
  },

  data () {
    return {
    }
  },

  methods: {
    goHome () {
      PageHelper.hardRedirectTo({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
.image {
  margin: 2em;
}

.content {
  margin-top: 1em;
  margin-bottom: 1em;
}

.content__title {
  h1 {
    font-family: "Lato";
    font-size: 40px;
  }
}

.content__message {
  margin-top: 1em;
}

.content__raw {
  margin: 1em;
  padding: 1em;
  color: $color-white;
  background-color: $color-black;
}

.call-to-action {
  margin-top: 2em;
}
</style>
