import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Validation
import Vuelidate from 'vuelidate'

// Notification
import Notifications from 'vue-notification'

// Moment
import moment from 'moment'

// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { concat, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

// Layouts
import ChatLayout from './components/Layouts/ChatLayout'
import DashboardLayout from './components/Layouts/DashboardLayout'
import DefaultLayout from './components/Layouts/DefaultLayout'
import DefaultError from './components/Errors/DefaultError'

// Used in startup
import TokenHelper from './helpers/TokenHelper'

Vue.component('chat-layout', ChatLayout)
Vue.component('dashboard-layout', DashboardLayout)
Vue.component('default-layout', DefaultLayout)
Vue.component('default-error', DefaultError)

Vue.config.productionTip = false

// HTTP link
const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP
})

const token = TokenHelper.getCurrentToken()

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

// Custom date format
moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY'
  }
})

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
