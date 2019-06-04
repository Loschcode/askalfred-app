<script>
import currentIdentity from '@/graphql/queries/currentIdentity'

export default {
  name: 'CurrentIdentityMixin',
  data () {
    return {
      currentIdentity: null,
      identityToken: localStorage.getItem('identityToken')
    }
  },

  methods: {
    isGuest () {
      return this.currentIdentity.role === 'guest'
    }
  },

  apollo: {
    currentIdentity
  }
}
</script>
