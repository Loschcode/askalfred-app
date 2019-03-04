import Vue from "vue";
import Router from "vue-router";

import Index from "./views/Index.vue";

// Connect
import SignIn from "./views/Connect/SignIn.vue";
import ForgotYourPassword from "./views/Connect/ForgotYourPassword.vue";

// GettingStarted
import WhatIsYourName from "./views/GettingStarted/WhatIsYourName.vue";
import CanIGetYourEmail from "./views/GettingStarted/CanIGetYourEmail.vue";
import ThankYou from "./views/GettingStarted/ThankYou.vue";
import Surprise from "./views/GettingStarted/Surprise.vue";
import DoNotForget from "./views/GettingStarted/DoNotForget.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      meta: { layout: "default" },
      component: Index
    },
    /**
     * Connect
     */
    {
      path: "/connect/sign-in",
      meta: { layout: "default" },
      component: SignIn
    },
    {
      path: "/connect/forgot-your-password",
      meta: { layout: "default" },
      component: ForgotYourPassword
    },
    /**
     * GettingStarted
     */
    {
      path: "/getting-started/what-is-your-name",
      meta: { layout: "default" },
      component: WhatIsYourName
    },
    {
      path: "/getting-started/can-i-get-your-email",
      meta: { layout: "default" },
      component: CanIGetYourEmail
    },
    {
      path: "/getting-started/thank-you",
      meta: { layout: "default" },
      component: ThankYou
    },
    {
      path: "/getting-started/surprise",
      meta: { layout: "default" },
      component: Surprise
    },
    {
      path: "/getting-started/do-not-forget",
      meta: { layout: "default" },
      component: DoNotForget
    }
  ]
});
