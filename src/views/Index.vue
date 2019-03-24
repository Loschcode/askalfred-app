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
    if (this.isGuest()) {
      router.push({ path: '/getting-started' })
    } else {
      router.push({ path: '/connect/sign-in' })
    }
  },

  methods: {
  }
}
</script>
