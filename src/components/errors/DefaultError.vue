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
            <h1>Snap! Something went wrong</h1>
          </div>
          <div class="content__message">
            {{ error.message }}
          </div>
          <div
            v-show="devEnv"
            class="content__raw"
          >
            Development: {{ error.raw }}
          </div>
        </div>
      </div>
    </div>
    <div class="row center-xs">
      <div class="col-xs-8 col-sm-7 col-md-5 col-lg-3">
        <div class="call-to-action">
          <div class="content__button">
            <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
              <a @click="refreshPage()">Try again</a>
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
  name: 'ErrorDefault',
  props: [
    'error'
  ],

  data () {
    return {
      devEnv: (process.env.NODE_ENV === 'development')
    }
  },

  methods: {
    refreshPage () {
      PageHelper.refreshPage()
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
  color: $color-black;
  background-color: $color-grey-blueish;
  @include button-radius("big");
}

.call-to-action {
  margin-top: 2em;
}
</style>
