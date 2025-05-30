import { boot } from "quasar/wrappers";
import { ref } from "vue";
import axios from "axios";

const API_URL = "https://api.giphy.com/v1/gifs/";
const api_key = "UrZXLRmihamRp5Aoy7O0rgi5MyY4rSYV";

/**
 * axios methods mostrados no console
 */
const _url_method = ref(null);

const api = axios.create({
  baseURL: API_URL,

  /**
   * URLS da API
   * const  { URLS } = api.defaults
   */
  URLS: {
    gifs_search: `${API_URL}search?api_key=${api_key}`,
    categories: `${API_URL}categories?api_key=${api_key}`,
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$API_URL = API_URL;
});

export { api, API_URL, _url_method };
