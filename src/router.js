import Vue from "vue";
import Router from "vue-router";

import Index from "./views/Index.vue";
import SignIn from "./views/Connect/SignIn.vue";
import WhatIsYourName from "./views/GettingStarted/WhatIsYourName.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      meta: { layout: "default" },
      component: Index
    },
    {
      path: "/connect/sign-in",
      meta: { layout: "default" },
      component: SignIn
    },
    {
      path: "/getting-started/what-is-your-name",
      meta: { layout: "default" },
      component: WhatIsYourName
    }
  ]
});
