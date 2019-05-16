import Vue from 'vue'
import Router from 'vue-router'

// Root
import Index from './views/Index.vue'
import Sitemap from './views/Sitemap'

// Connect
import SignIn from './views/Connect/SignIn.vue'
import ForgotYourPassword from './views/Connect/ForgotYourPassword.vue'
import RecoveryEmail from './views/Connect/RecoveryEmail.vue'
import ResetYourPassword from './views/Connect/ResetYourPassword.vue'

// GettingStarted
import GettingStartedIndex from './views/GettingStarted/Index.vue'
import WhatIsYourName from './views/GettingStarted/WhatIsYourName.vue'
import CanIGetYourEmail from './views/GettingStarted/CanIGetYourEmail.vue'
import ThankYou from './views/GettingStarted/ThankYou.vue'
import ConfirmEmail from './views/GettingStarted/ConfirmEmail.vue'
import Surprise from './views/GettingStarted/Surprise.vue'
import DoNotForget from './views/GettingStarted/DoNotForget.vue'

// Pages
import LegalMentions from './views/Pages/LegalMentions.vue'
import PrivacyPolicy from './views/Pages/PrivacyPolicy.vue'

// Tickets
import TicketsIndex from './views/Tickets/Index.vue'
import TicketsConnection from './views/Tickets/List.vue'
import TicketsShow from './views/Tickets/Show.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    /**
     * Root
     */
    {
      path: '/',
      meta: { layout: 'default' },
      component: Index
    },
    {
      path: '/sitemap',
      meta: { layout: 'default' },
      component: Sitemap
    },
    /**
     * Connect
     */
    {
      path: '/connect/sign-in',
      meta: { layout: 'default' },
      component: SignIn
    },
    {
      path: '/connect/forgot-your-password',
      meta: { layout: 'default' },
      component: ForgotYourPassword
    },
    {
      path: '/connect/recovery-email',
      meta: { layout: 'default' },
      component: RecoveryEmail
    },
    {
      path: '/connect/reset-your-password',
      meta: { layout: 'default' },
      component: ResetYourPassword
    },
    /**
     * GettingStarted
     */
    {
      path: '/getting-started',
      meta: { layout: 'default' },
      component: GettingStartedIndex
    },
    {
      path: '/getting-started/what-is-your-name',
      meta: { layout: 'default' },
      component: WhatIsYourName
    },
    {
      path: '/getting-started/can-i-get-your-email',
      meta: { layout: 'default' },
      component: CanIGetYourEmail
    },
    {
      path: '/getting-started/thank-you',
      meta: { layout: 'default' },
      component: ThankYou
    },
    {
      path: '/getting-started/confirm-email',
      meta: { layout: 'default' },
      component: ConfirmEmail
    },
    {
      path: '/getting-started/surprise',
      meta: { layout: 'default' },
      component: Surprise
    },
    {
      path: '/getting-started/do-not-forget',
      meta: { layout: 'default' },
      component: DoNotForget
    },
    /**
     * Pages
     */
    {
      path: '/pages/legal-mentions',
      meta: { layout: 'default' },
      component: LegalMentions
    },
    {
      path: '/pages/privacy-policy',
      meta: { layout: 'default' },
      component: PrivacyPolicy
    },
    /**
     * Tickets
     */
    {
      path: '/tickets',
      meta: { layout: 'default' },
      component: TicketsIndex
    },
    {
      path: '/tickets/list',
      meta: { layout: 'dashboard' },
      component: TicketsConnection
    },
    {
      path: '/tickets/show',
      meta: { layout: 'chat' },
      component: TicketsShow
    }
  ]
})

router.beforeEach((to, from, next) => {
  return next()
})

export default router
