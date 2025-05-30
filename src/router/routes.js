const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        alias: "/",
        name: "home",
        path: "/home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "lista-gifs",
        path: "/lista-gifs",
        component: () => import("src/pages/ListaGifs.vue"),
      },
      {
        name: "favoritos",
        path: "/favoritos",
        component: () => import("src/pages/FavoritosGif.vue"),
      },
      {
        name: "categorias",
        path: "/categorias",
        component: () => import("src/pages/CategoriasGif.vue"),
      },
      {
        name: "sobre",
        path: "/sobre",
        component: () => import("src/pages/SobreUser.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/login",
    name: "login",
    component: () => import("pages/PageLogin.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
