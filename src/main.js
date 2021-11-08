import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

Vue.config.productionTip = false;
Vue.use(VueRouter);
const routes = [
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
  { path: "*", component: SignIn },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");

