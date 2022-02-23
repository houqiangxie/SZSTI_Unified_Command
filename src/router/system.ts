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
    component: () => import("@/views/system/index.vue"),
    children: [
      {
        path: "componentCenter",
        name: "ComponentCenter",
        component: () => import("@/views/system/ComponentCenter.vue"),
      },
      {
        path: "layout",
        name: "Layout",
        component: () => import("@/views/system/layout.vue"),
      },
    ],
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