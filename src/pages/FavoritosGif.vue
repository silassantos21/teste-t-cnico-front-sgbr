<template>
  <div class="container mx-auto pt-4">
    <q-card class="border-neutral-80 rounded" flat>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-brands fa-gratipay"
          text="Lista de Favoritos"
        />
      </div>
      <div class="m-10" style="text-align: -webkit-center">
        <div
          class="row q-gutter-md flex-center"
          v-if="favorited_gifs.length > 0"
        >
          <template v-for="(gif, index) in favorited_gifs" :key="index">
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
        <div class="row q-gutter-md flex-center" v-else>
          <p class="font-semibold text-xl font-sans text-grey-9">
            Não há gifs favoritados.
          </p>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGifStore } from "../stores/gif.store";
import TextIcon from "../components/TextIcon.vue";

const { favorited_gifs } = storeToRefs(useGifStore());
const { setFavoritedGifs, removeFavoritedGif } = useGifStore();
</script>

<style lang="scss"></style>

<style lang="sass" scoped></style>
