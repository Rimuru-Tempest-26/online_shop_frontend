import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductListView from "../views/ProductListView.vue";
import ProductCreateView from "../views/ProductCreateView.vue";
import store from "@/store";
import ProductEditView from "@/views/ProductEditView";

function alreadyLogin(to, from, next) {
  if (store.state.auth) {
    return next("/dashboard");
  }
  return next();
}

function needAuth(to, from, next) {
  if (store.state.auth === null) {
    return next("/login");
  }
  return next();
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    beforeEnter: [alreadyLogin],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: [alreadyLogin],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: [needAuth],
  },
  {
    path: "/products",
    name: "products",
    component: ProductListView,
    beforeEnter: [needAuth],
  },
  {
    path: "/products/create",
    name: "products/create",
    component: ProductCreateView,
    beforeEnter: [needAuth],
  },
  {
    path: "/products/edit/:id",
    name: "products/edit",
    component: ProductEditView,
    beforeEnter: [needAuth],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
