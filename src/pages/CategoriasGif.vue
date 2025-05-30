<template>
  <div class="container mx-auto pt-4">
    <q-card class="border-neutral-80 rounded" flat>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-solid fa-layer-group"
          text="Pesquisar gifs por categoria"
        />
      </div>
      <div class="row flex-center q-gutter-lg">
        <q-select
          v-model="filtroGifCategoria"
          :options="categorias"
          dense
          label="Pesquisar por caregoria"
          class="w-[600px]"
          @input-value="loadGifsCategoria"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-select>
        <q-select
          :disable="sub_categorias.length === 0"
          v-model="filtroGifSubCategoria"
          :options="sub_categorias"
          dense
          label="Pesquisar por sub-categoria"
          class="w-[600px]"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-select>
      </div>
      <div class="m-10" style="text-align: -webkit-center">
        <div
          class="row q-gutter-md flex-center"
          v-if="filtered_gifs.length > 0"
        >
          <template v-for="(gif, index) in filtered_gifs" :key="index">
            <q-card
              flat
              bordered
              class="my-card col-3 min-w-[450px] min-h-[300px]"
            >
              <q-card-section>
                <div class="text-h6">{{ gif.title }}</div>
              </q-card-section>

              <q-card-section>
                <img
                  :src="gif.url"
                  alt="GIF animado"
                  style="width: 100%; max-width: 300px"
                />
                <q-card-actions vertical class="justify-around q-px-md">
                  <q-btn
                    v-if="gif.isFavorited"
                    flat
                    round
                    color="red"
                    icon="fa-solid fa-heart"
                    @click="removeFavoritedGif(gif)"
                  >
                    <q-tooltip> Remover dos favoritos </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="!gif.isFavorited"
                    flat
                    round
                    color="red"
                    icon="fa-regular fa-heart"
                    @click="setFavoritedGifs(gif)"
                  >
                    <q-tooltip> Adicionar aos favoritos </q-tooltip>
                  </q-btn>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </template>
        </div>
        <div
          v-if="filtered_gifs.length === 0 && !isLoading"
          class="row q-gutter-md flex-center"
        >
          <p class="font-semibold text-xl font-sans text-grey-9">
            Não há dados. Favor, selecionar categoria.
          </p>
        </div>
        <div v-if="isLoading" class="row q-gutter-md flex-center">
          <q-spinner color="blue-9" size="5rem" :thickness="10" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { storeToRefs } from "pinia";
import { useGifStore } from "../stores/gif.store";
import TextIcon from "../components/TextIcon.vue";

const { categorias, sub_categorias, filtered_gifs, favorited_gifs, isLoading } =
  storeToRefs(useGifStore());
const {
  getCategoriasGifsByFilter,
  getGifsByFilter,
  clearGifs,
  clearSubCategoriasGifs,
  setFavoritedGifs,
  setSubCategoriasGifs,
  removeFavoritedGif,
} = useGifStore();

const filtroGifCategoria = ref("");
const filtroGifSubCategoria = ref("");

const requests = async () => {
  await getCategoriasGifsByFilter();
};

onMounted(async () => {
  clearSubCategoriasGifs();
  clearGifs();
  await requests();
});

watch(filtroGifCategoria, async () => {
  clearGifs();
  clearSubCategoriasGifs();
  filtroGifSubCategoria.value = "";
  setSubCategoriasGifs(filtroGifCategoria.value);
  await getGifsByFilter(filtroGifCategoria.value);
});

watch(filtroGifSubCategoria, async () => {
  if (filtroGifSubCategoria.value) {
    clearGifs();
    await getGifsByFilter(filtroGifSubCategoria.value);
  }
});
</script>

<style lang="scss"></style>

<style lang="sass" scoped></style>
