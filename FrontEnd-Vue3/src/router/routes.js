const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Página Inicial",
        component: () => import("pages/IndexPage.vue"),
        children: [
          {
            path: "/camisetas",
            name: "Camisetas",
            component: () => import("pages/Categories/CamisetasPage.vue"),
          },
          {
            path: "/calcas",
            name: "Calças",
            component: () => import("pages/Categories/CalcasPage.vue"),
          },
          {
            path: "/calcados",
            name: "Calçados",
            component: () => import("pages/Categories/CalcadosPage.vue"),
          },
          {
            path: "/contato",
            name: "Contato",
            component: () => import("pages/ContatoPage.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
