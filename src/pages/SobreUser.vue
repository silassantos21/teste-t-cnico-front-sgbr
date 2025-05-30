<template>
  <div class="container mx-auto pt-4">
    <q-card class="border-neutral-80 rounded" flat>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-regular fa-id-card"
          text="Sobre o Desenvolvedor e Teste"
        />
      </div>
      <div class="m-10" style="text-align: -webkit-center">
        <q-card flat class="my-card w-[60%]">
          <q-item-section avatar class="flex-center">
            <q-avatar size="250px">
              <img :src="imageUser" />
            </q-avatar>
          </q-item-section>
          <q-card-section>
            <div class="text-h4 text-sgbr">Silas Ribeiro dos Santos</div>
            <div class="text-h6 text-sgbr">Teste técnico SGBR</div>
          </q-card-section>
          <hr />
          <q-card-section>
            <div class="text-subtitle2 text-sgbr">{{ sobreMim }}</div>
          </q-card-section>
          <hr />
          <q-card-section>
            <div class="text-subtitle2 text-sgbr">{{ sobreTeste }}</div>
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextIcon from "../components/TextIcon.vue";
import imageUser from "../../public/image/Foto foto.png";

const sobreMim = ref(
  "Sou um desenvolvedor com vasta experiência em Frontend, especializado no framework Vue. Consegui estudar bem esse framework acompanhado do Quasar desde 2020, me auxiliando a usar componentes estilizados e fácil manutenibilidade dos dados. Também estudei bastante os gerenciamentos de estado, incluindo Vuex e atualmente o Pinia."
);

const sobreTeste = ref(
  "Em relação ao teste, usei todas as ferramentas necessitadas: Vue3, Quasar, Axios, Pinia, Persiste-date no lugar de local-storage. O login e logout é feito através de uma manipulação dos routers, ao ter um valor no Cookie SGBR_token, condicionando assim o login."
);
</script>

<style lang="scss"></style>

<style lang="sass" scoped></style>
