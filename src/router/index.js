import Vue from 'vue';
import VueRouter from 'vue-router';

import ProductsView from '../views/ProductsView.vue';

import AboutView from '../views/AboutView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'productsview',
    component: ProductsView,
  },

  {
    path: '/aboutview',
    name: 'aboutview',
    component: AboutView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
