<template>
  <div class="index">
    <SignIn />
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/connect/SignIn.vue'

export default {
  name: 'index',
  components: {
    SignIn
  }
}
</script>
