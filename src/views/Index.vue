<template>
  <div class="index" />
</template>

<script>
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'Index',

  components: {
  },

  mixins: [
    CurrentIdentityMixin
  ],

  created () {
    if (this.isGuest() && !this.signInIsKnown()) {
      router.push({ path: '/getting-started' })
    } else {
      router.push({ path: '/connect/sign-in' })
    }
  },

  methods: {
    signInIsKnown () {
      return localStorage.getItem('sign-in-is-known')
    }
  }
}
</script>
