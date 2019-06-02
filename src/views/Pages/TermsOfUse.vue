<template>
  <div class="legal-notice">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>Terms of use</h1>
        </div>
      </div>
    </div>

    <!-- Can I get your email? -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="form">
          <div class="page">
            TODO
          </div>
        </div>
      </div>
    </div>

    <!-- Back footer -->
    <div class="row center-xs">
      <div class="footer-placeholder" />
      <div class="footer">
        <a @click="goBack()">Back</a>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'TermsOfUse',
  props: {
  },

  methods: {
    goBack () {
      router.go(-1) || router.push({ path: '/connect/sign-in' })
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

.page {
  p {
    font-size: sizing(2.7);
    text-align: justify;
    margin-bottom: 1em;
  }
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

.footer-placeholder {
  margin: 2em;
}

.footer {
  position: absolute;
  bottom: 0;
  padding: 1em;
  color: $color-white;
  a {
    color: $color-white;
  }
}
</style>
