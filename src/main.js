import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Validation
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

// Errors
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

// Notification
import Notifications from 'vue-notification'

// Trackings
import VueAnalytics from 'vue-analytics'

// Apollo
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
// import { HttpLink } from 'apollo-link-http'
import { concat, split } from 'apollo-link'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

// FragmentMatcher
// stored above `src/`
import introspectionQueryResultData from '@/../fragmentTypes.json'

// Layouts
import ChatLayout from '@/components/Layouts/ChatLayout'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import PagesLayout from '@/components/Layouts/PagesLayout'
import DefaultError from '@/components/Errors/DefaultError'

// Used in startup
import TokenHelper from './helpers/TokenHelper'
import TimeHelper from './helpers/TimeHelper'

Vue.component('chat-layout', ChatLayout)
Vue.component('dashboard-layout', DashboardLayout)
Vue.component('default-layout', DefaultLayout)
Vue.component('pages-layout', PagesLayout)
Vue.component('default-error', DefaultError)

Vue.config.productionTip = false

// HTTP link
// NOTE : we removed this because we use the createUploadLink instead to upload files
// const httpLink = new HttpLink({
//   uri: process.env.VUE_APP_GRAPHQL_HTTP
// })

const httpLink = createUploadLink({
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

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

const apolloClient = new ApolloClient({
  cache,
  link,
  connectToDevTools: true
})

Vue.use(VueApollo)

TimeHelper.setLocales()

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: ''
  }
})

Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(Notifications)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS,
  autoTracking: {
    screenview: true
  }
})

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
