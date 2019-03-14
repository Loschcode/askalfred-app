import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import VueApollo from 'vue-apollo'

// Layouts
import Default from './layouts/Default'

Vue.component('default-layout', Default)

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: localStorage.getItem('identityToken') || null
    }
  })
  return forward(operation)
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([authMiddleware, httpLink]),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
