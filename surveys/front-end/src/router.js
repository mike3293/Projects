import Vue from "vue";
import Router from "vue-router";
import store from "./store";
// import { authService } from "./main";

import Signin from "./auth/SignIn";

Vue.use(Router);

const router = new Router({
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
            component: () => import("./auth/SignUp")
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import("./admin/Admin"),
            children: [
                {
                    path: "users",
                    name: "users",
                    component: () => import("./admin/user-list/UserList")
                },
                {
                    path: "users/edit",
                    name: "edit",
                    props: true,
                    component: () => import("./admin/user-list/UserEdit")
                },
                {
                    path: "create-survey",
                    name: "create-survey",
                    component: () => import("./admin/CreateSurvey")
                },
                {
                    path: "surveys",
                    name: "surveys-list",
                    component: () => import("./admin/surveys-list/SurveysList")
                },
                {
                    path: "results",
                    name: "survey-results",
                    props: true,
                    component: () => import("./admin/surveys-list/SurveyStats")
                },
            ],
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/surveys",
            name: "surveys",
            component: () => import("./survey/SurveysList"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/survey",
            name: "survey",
            props: true,
            component: () => import("./survey/Survey"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/about",
            name: "about",
            component: () => import("./about/About")
        }
    ]
});

export default router;

router.beforeEach(async function (to, from, next) {
    if (!store.state.common.appIsLoaded) {
        try {
            store.commit("setLoading", true);
            const user = await Vue.prototype.$auth.checkSignIn();
            // const user = await authService.checkSignIn();
            store.dispatch("setUser", user);
        } catch (e) {
            console.log(e);
        } finally {
            store.commit("setLoading", false);
            store.state.common.appIsLoaded = true;
        }
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.state.login;

    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    const isAdmin = (store.state.role === "admin");

    if (requiresAuth && !isAuthenticated) {
        next("/");
    } else if (requiresAdmin && !isAdmin) {
        next("/surveys");
    } else {
        next();
    }
})