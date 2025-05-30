import { computed, nextTick, ref } from "vue";
import { Cookies, LoadingBar } from "quasar";
import { defineStore } from "pinia";
import { NotifyError } from "boot/Notify";
import { Router } from "../router/index";

export const useAuthStore = defineStore("authStore", () => {
  const loggedUser = ref(null);

  function saveToken(token) {
    Cookies.set("SGBR_TOKEN", token);
  }

  async function login(email, password) {
    try {
      const payloadLogin = {
        email,
        password,
      };
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const array = new Uint8Array(20);
      crypto.getRandomValues(array);
      const data = {
        token: Array.from(
          array,
          (byte) => caracteres[byte % caracteres.length]
        ).join(""),
      };
      saveToken(data.token);
      loggedUser.value = payloadLogin;
      loggedUser.value.name = loggedUser.value.email.substr(
        0,
        loggedUser.value.email.indexOf("@")
      );
      Router.push({ name: "home" });
      return true;
    } catch (e) {
      console.log(e);
      NotifyError(`Usuario ou senha invalidos`);
      return false;
    }
  }

  /**
   * Faz logout e redireciona para o tela de login,
   * com um parametro logout na url
   * remove  token, refresh e usuario
   */
  async function logout() {
    LoadingBar.stop();
    loggedUser.value = null;
    Cookies.remove("SGBR_TOKEN");
    await nextTick();
    Router.push({ name: "login" });
  }

  return {
    loggedUser,
    login,
    logout,
  };
});
