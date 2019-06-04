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
      meta: { layout: 'Default' },
      component: Index
    },
    /**
     * Connect
     */
    {
      path: '/connect/sign-in',
      meta: { layout: 'Default' },
      component: SignIn
    },
    {
      path: '/connect/sign-out',
      meta: { layout: 'Default' },
      component: SignOut
    },
    {
      path: '/connect/forgot-your-password',
      meta: { layout: 'Default' },
      component: ForgotYourPassword
    },
    {
      path: '/connect/recovery-email',
      meta: { layout: 'Default' },
      component: RecoveryEmail
    },
    {
      path: '/connect/reset-your-password',
      meta: { layout: 'Default' },
      component: ResetYourPassword
    },
    /**
     * GettingStarted
     */
    {
      path: '/getting-started',
      meta: { layout: 'Default' },
      component: GettingStartedIndex
    },
    {
      path: '/getting-started/what-is-your-name',
      meta: { layout: 'Default' },
      component: WhatIsYourName
    },
    {
      path: '/getting-started/can-i-get-your-email',
      meta: { layout: 'Default' },
      component: CanIGetYourEmail
    },
    {
      path: '/getting-started/thank-you',
      meta: { layout: 'Default' },
      component: ThankYou
    },
    {
      path: '/getting-started/confirm-email',
      meta: { layout: 'Default' },
      component: ConfirmEmail
    },
    {
      path: '/getting-started/surprise',
      meta: { layout: 'Default' },
      component: Surprise
    },
    {
      path: '/getting-started/do-not-forget',
      meta: { layout: 'Default' },
      component: DoNotForget
    },
    /**
     * Pages
     */
    {
      path: '/pages/legal-notice',
      meta: { layout: 'Pages' },
      component: LegalNotice
    },
    {
      path: '/pages/terms-of-use',
      meta: { layout: 'Pages' },
      component: TermsOfUse
    },
    {
      path: '/pages/privacy-policy',
      meta: { layout: 'Pages' },
      component: PrivacyPolicy
    },
    /**
     * Emails
     */
    {
      path: '/emails/unsubscribe',
      meta: { layout: 'Default' },
      component: EmailsUnsubscribe
    },
    /**
     * Tickets
     */
    {
      path: '/tickets',
      meta: { layout: 'Default' },
      component: TicketsIndex
    },
    {
      path: '/tickets/list',
      meta: { layout: 'Dashboard' },
      component: TicketsConnection
    },
    {
      path: '/tickets/chat/:id',
      meta: { layout: 'Chat' },
      component: TicketChat
    },
    /**
     * Not Found
     */
    {
      path: '/errors/not-found',
      meta: { layout: 'Default' },
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
