import Vue from 'vue'
import Router from 'vue-router'

// Root
import Index from './views/Index.vue'

// Connect
import SignIn from './views/Connect/SignIn.vue'
import SignOut from './views/Connect/SignOut.vue'
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
import LegalNotice from './views/Pages/LegalNotice.vue'
import TermsOfUse from './views/Pages/TermsOfUse.vue'
import PrivacyPolicy from './views/Pages/PrivacyPolicy.vue'

// Emails
import EmailsUnsubscribe from './views/Emails/Unsubscribe.vue'

// Tickets
import TicketsIndex from './views/Tickets/Index.vue'
import TicketsConnection from './views/Tickets/List.vue'
import TicketChat from './views/Tickets/Chat.vue'

// Errors
import NotFound from './views/Errors/NotFound.vue'

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
    /**
     * Connect
     */
    {
      path: '/connect/sign-in',
      meta: { layout: 'default' },
      component: SignIn
    },
    {
      path: '/connect/sign-out',
      meta: { layout: 'default' },
      component: SignOut
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
      path: '/pages/legal-notice',
      meta: { layout: 'pages' },
      component: LegalNotice
    },
    {
      path: '/pages/terms-of-use',
      meta: { layout: 'pages' },
      component: TermsOfUse
    },
    {
      path: '/pages/privacy-policy',
      meta: { layout: 'pages' },
      component: PrivacyPolicy
    },
    /**
     * Emails
     */
    {
      path: '/emails/unsubscribe',
      meta: { layout: 'default' },
      component: EmailsUnsubscribe
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
      path: '/tickets/chat/:id',
      meta: { layout: 'chat' },
      component: TicketChat
    },
    /**
     * Not Found
     */
    {
      path: '/errors/not-found',
      meta: { layout: 'default' },
      component: NotFound
    },
    {
      path: '*',
      redirect: '/errors/not-found'
    }
  ]
})

router.beforeEach((to, from, next) => {
  return next()
})

export default router
