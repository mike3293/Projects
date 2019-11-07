import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

import Signin from "./auth/sign-in/SignIn.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "sign-in",
            component: Signin
        },
        {
            path: "/admin",
            name: "admin",
            component: function () {
                return import("./admin/Admin.vue");
            },
            children: [{
                    path: "users",
                    name: "users",
                    component: function () {
                        return import("./admin/user-list/UserList.vue");
                    }
                },
                {
                    path: 'users/edit',
                    name: "edit",
                    props: true,
                    component: function () {
                        return import("./admin/user-edit/UserEdit.vue");
                    }
                },
                {
                    path: "create-survey",
                    name: "create-survey",
                    component: function () {
                        return import("./admin/create-survey/CreateSurvey.vue");
                    }
                },
                {
                    path: "surveys",
                    name: "surveys-list",
                    component: function () {
                        return import("./admin/surveys-list/SurveysList.vue");
                    }
                },
                {
                    path: "results",
                    name: "survey-results",
                    props: true,
                    component: function () {
                        return import("./admin/stats/SurveyStats.vue");
                    }
                },
            ],
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: function () {
                return import("./auth/sign-up/SignUp.vue");
            }
        },
        {
            path: "/surveys",
            name: "surveys",
            component: function () {
                return import("./survey/surveys-list/SurveysList.vue");
            },
            meta: {
                requiresAuth: true
            }

        },
        {
            path: "/survey",
            name: "survey",
            props: true,
            component: function () {
                return import("./survey/Survey.vue");
            },
            meta: {
                requiresAuth: true
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
            component: function () {
                return import("./about/About.vue");
            }
        }
    ]
});

export default router;

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.state.login;

    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    const isAdmin = (store.state.role === 'admin');

    if (requiresAuth && !isAuthenticated) {
        next('/');
    } else if (requiresAdmin && !isAdmin) {
        next('/surveys');
    } else {
        next();
    }
})