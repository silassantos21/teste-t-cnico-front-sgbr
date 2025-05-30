<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-blue-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <img :src="imageSgbr" class="h-[50px] q-mx-md" />
        <q-space />
        <q-toolbar-title v-if="loggedUser" class="text-right">
          Olá, {{ loggedUser.name || "Saindo..." }}
        </q-toolbar-title>

        <div v-if="loggedUser">
          <q-btn-dropdown split class="bg-sgbr" push no-caps icon="person">
            <div class="row justify-center no-wrap q-pa-md">
              <div class="items-center">
                <q-avatar size="72px">
                  <img :src="userIcon" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ loggedUser.name }}
                </div>
                <q-btn
                  class="text-sgbr"
                  outline
                  label="Logout"
                  push
                  size="sm"
                  @click="logout"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="300"
      :breakpoint="500"
      bordered
    >
      <q-list>
        <q-item-label header> Menu SGBR </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import userIcon from "/image/user-icon.png";
import imageSgbr from "/image/sgbr.jpeg";
import EssentialLink from "components/EssentialLink.vue";

import { useAuthStore } from "../stores/auth.store";

import { storeToRefs } from "pinia";

const { logout } = useAuthStore();

const { loggedUser } = storeToRefs(useAuthStore());

defineOptions({
  name: "MainLayout",
});

const miniState = ref(true);

const linksList = [
  {
    title: "Home",
    caption: "Home",
    icon: "home",
    link: "/home",
  },
  {
    title: "Lista de Gifs",
    caption: "ListaGifs",
    icon: "fa-solid fa-film",
    link: "/lista-gifs",
  },
  {
    title: "Favoritos",
    caption: "Favoritos",
    icon: "fa-solid fa-heart",
    link: "/favoritos",
  },
  {
    title: "Categorias",
    caption: "Categorias",
    icon: "fa-solid fa-layer-group",
    link: "/categorias",
  },
  {
    title: "Sobre",
    caption: "Sobre",
    icon: "fa-regular fa-id-card",
    link: "/sobre",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.text-sgbr {
  color: #0a2992;
}
.bg-sgbr {
  background-color: #0a2992;
}

.q-item.q-router-link--active,
.q-item--active {
  color: #0a2992 !important;
}
</style>
