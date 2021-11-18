import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import User from "./components/User";
import Clients from "./components/Clients";
import Client from "./components/Client";

Vue.config.productionTip = false;
Vue.use(VueRouter);
const routes = [
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
  { path: "/users", component: Users },
  { path: '/users/:id', component: User },
  { path: "/clients", component: Clients },
  { path: "/clients/:id", component: Client },
  { path: "*", component: SignUp },
  
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");

