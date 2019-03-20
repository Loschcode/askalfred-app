<script>
import currentIdentity from '@/graphql/queries/currentIdentity'

export default {
  data () {
    return {
      currentIdentity: null
    }
  },

  created () {
  },

  computed: {
    // NOTE : this is needed for fetch the currentIdentity
    identityToken () {
      return localStorage.getItem('identityToken')
    }
  },

  apollo: {
    currentIdentity
  }
}
</script>
