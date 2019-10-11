import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./auth/sign-in/SignIn.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "sign-in",
      component: Signin
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: function() {
        return import("./auth/sign-up/SignUp.vue");
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      component: function() {
        return import("./about/About.vue");
      }
    }
  ]
});
