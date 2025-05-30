<template>
  <q-layout class="grid place-items-center">
    <div
      class="grid grid-cols-2 login-desktop content-center h-screen w-screen"
      style="background-color: #0a2992"
    >
      <div class="col-span-1 relative self-center mx-auto">
        <q-img class="w-48 h-24" :src="imageSgbr" />
      </div>

      <div class="col-span-1 mx-auto min-w-[30vw]">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card
            class="my-card flex flex-col rounded-lg shadow-md max-w-[30vw]"
          >
            <q-card-section>
              <div class="text-h6 text-sgbr">Login</div>
              <div class="text-subtitle2 font-bold text-sgbr">
                Informe seus dados cadastrais
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                ref="login"
                label-color="sgbr"
                v-model="data.login"
                :rules="[(val) => !!val || 'Campo Obrigatorio']"
                size="md"
                label="Login"
              />
              <InputPassword
                :model-value="data.senha"
                @update:model-value="(v) => (data.senha = v)"
              />
              <q-btn
                :loading="load"
                size="md"
                type="submit"
                outline
                class="text-sgbr w-full mt-40 md:mt-32"
                >Entrar na conta
              </q-btn>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
    <div
      class="login-mobile content-center h-screen w-screen"
      style="background-color: #0a2992"
    >
      <div class="mx-8 w-[85vw]">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card class="my-card flex flex-col rounded-lg shadow-md">
            <q-card-section>
              <div class="text-h6 text-sgbr">Login</div>
              <div class="text-subtitle2 font-bold text-sgbr">
                Informe seus dados cadastrais
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                ref="login"
                label-color="sgbr"
                v-model="data.login"
                :rules="[(val) => !!val || 'Campo Obrigatorio']"
                size="md"
                label="Login"
              />
              <InputPassword
                :model-value="data.senha"
                @update:model-value="(v) => (data.senha = v)"
              />
              <q-btn
                :loading="load"
                size="md"
                type="submit"
                outline
                class="text-sgbr w-full mt-40 md:mt-32"
                >Entrar na conta
              </q-btn>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { useAuthStore } from "../stores/auth.store";
import InputPassword from "../components/InputPassword.vue";
import imageSgbr from "../../public/image/sgbr.jpeg";

const { login } = useAuthStore();

const formType = ref("login");
const load = ref(false);
const emailRecipient = ref("");

const data = ref({
  login: "teste.login@sgbr.com.br",
  senha: "sgbr2025",
});

async function onSubmit() {
  load.value = true;

  await login(data.value.login, data.value.senha);
  load.value = false;
}

watch(formType, async () => {
  await nextTick();
  emailRecipient.value = "";
  animationForm();
});
</script>

<style lang="scss">
@media (max-width: 767px) {
  .login-desktop {
    display: none;
  }
}

@media (min-width: 767px) {
  .login-mobile {
    display: none;
  }
}
</style>

<style>
.text-sgbr {
  color: #0a2992;
}
</style>
