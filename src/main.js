import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Validation
import Vuelidate from 'vuelidate'

// Notification
import Notifications from 'vue-notification'

// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

// Layouts
import DefaultLayout from './components/layouts/DefaultLayout'
import DefaultError from './components/errors/DefaultError'

Vue.component('default-layout', DefaultLayout)
Vue.component('default-error', DefaultError)

Vue.config.productionTip = false

// HTTP link
const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP
})

const token = localStorage.getItem('identityToken')

// Cable link
const authCableUrl = `${process.env.VUE_APP_CABLE}?token=${token}`
const cable = ActionCable.createConsumer(authCableUrl)
const cableLink = new ActionCableLink({ cable })

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const endLink = split(hasSubscriptionOperation, cableLink, httpLink)

// Authentication headers
const authMiddleware = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    token
  }
}))

// Concat links (cable / http) with authentication
const link = concat(authMiddleware, endLink)

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  link,
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: ''
  }
})

Vue.use(Vuelidate)
Vue.use(Notifications)

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
