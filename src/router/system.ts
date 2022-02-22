import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
const system =import("@/views/system/index.vue")

const routes: Array<RouteRecordRaw> = [
  // {
  //     path: '/',
  //     name: 'Index',
  //     component: () => import('@/views/index.vue'),
  // },
  {
    path: "/",
    name: "System",
    component: system,
  },
  {
    path: "/systemA",
    name: "SystemA",
    component: () => import("@/views/system/systemA.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];


export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //   history: createWebHistory("/custom-scaffold/"),
  routes, // short for `routes: routes`
});