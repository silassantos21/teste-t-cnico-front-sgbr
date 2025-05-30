import { acceptHMRUpdate, defineStore } from "pinia";
import { api } from "../boot/axios";
import { ref } from "vue";

export const useGifStore = defineStore("gifStore", () => {
  const { URLS } = api.defaults;

  const isLoading = ref(false);

  const filtered_gifs = ref([]);
  const favorited_gifs = ref([]);

  async function getGifsByFilter(filter = "dance") {
    isLoading.value = true;
    try {
      const { data } = await api.get(`${URLS.gifs_search}&q=${filter}`);
      setFilteredGifs(data);
      return data;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      isLoading.value = false;
    }
  }

  const setFilteredGifs = (value) => {
    filtered_gifs.value = value.data.map((v) => {
      return {
        id: v.id,
        title: v.title,
        url: v.images.preview_gif.url,
        isFavorited:
          favorited_gifs.value.filter((w) => w.id === v.id).length > 0,
      };
    });
  };

  function clearGifs() {
    filtered_gifs.value = [];
  }

  const setFavoritedGifs = (value) => {
    favorited_gifs.value.push(value);
    filtered_gifs.value.forEach((v, index) => {
      if (value.id === v.id) {
        filtered_gifs.value[index].isFavorited = true;
      }
    });
  };

  const removeFavoritedGif = (value) => {
    favorited_gifs.value = favorited_gifs.value.filter(
      (w) => w.id !== value.id
    );
    filtered_gifs.value.forEach((w, index) => {
      if (value.id === w.id) {
        filtered_gifs.value[index].isFavorited = false;
      }
    });
  };

  return {
    filtered_gifs,
    favorited_gifs,
    clearGifs,
    getGifsByFilter,
    setFavoritedGifs,
    removeFavoritedGif,
    isLoading,
  };
});
