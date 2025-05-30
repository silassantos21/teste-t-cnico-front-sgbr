<template>
  <div class="container mx-auto pt-4">
    <q-card class="border-neutral-80 rounded" flat>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-solid fa-film"
          text="Lista de Gifs"
        />
      </div>
      <div class="row flex-center">
        <q-input
          dense
          v-model="filtroGifSearch"
          placeholder="Pesquisar por nome"
          class="w-[600px]"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
            Não há dados. Favor, realizar uma busca.
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

const { filtered_gifs, favorited_gifs, isLoading } = storeToRefs(useGifStore());
const { getGifsByFilter, clearGifs, setFavoritedGifs, removeFavoritedGif } =
  useGifStore();

const filtroGifSearch = ref("");

const requests = async () => {
  await getGifsByFilter(filtroGifSearch.value);
};

onMounted(async () => {
  clearGifs();
  await requests();
});

watch(filtroGifSearch, async () => {
  if (filtroGifSearch.value.length > 3) {
    setTimeout(async () => {
      await requests();
    }, 3000);
  } else if (filtroGifSearch.value.length === 0) {
    clearGifs();
  }
});
</script>

<style lang="scss"></style>

<style lang="sass" scoped></style>
