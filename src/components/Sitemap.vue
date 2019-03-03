<template>
  <div class="sitemap">
    <h3>Connect</h3>
    <router-link to="/connect/sign-in">SignIn</router-link>

    <h3>Getting Started</h3>
    <router-link to="/getting-started/what-is-your-name">WhatIsYourName</router-link>
  </div>
</template>

<script>
export default {
  name: 'Sitemap',
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