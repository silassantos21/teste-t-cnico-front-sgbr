<template>
  <div class="container mx-auto pt-4">
    <q-card class="border-neutral-80 rounded" flat bordered>
      <div class="flex items-center justify-between">
        <TextIcon
          iconSize="40px"
          iconClass="fa-solid fa-film"
          text="Lista de Gifs"
        />
      </div>
      <!-- v-if="dadosFiltro.length > 0"
      chart-mobile -->
      <div class="m-10" style="text-align: -webkit-center"></div>
    </q-card>
  </div>
</template>

<script setup>
// import { ref, onMounted, watch } from "vue";

// import { storeToRefs } from "pinia";
// import { useUserStore } from "../stores/usuario.store";
// import ChartEstatisticas from "../components/ChartEstatisticas.vue";
import TextIcon from "../components/TextIcon.vue";

// const { users } = storeToRefs(useUserStore());
// const { getUsers } = useUserStore();

// const dadosFiltro = ref([]);
// const datasFiltro = ref([]);

// function setGraficoDados() {
//   console.log(users.value);
//   const result = [
//     users.value.filter((v) => v.job.toLowerCase() !== "sem emprego").length,
//     users.value.filter((v) => v.job.toLowerCase() === "sem emprego").length,
//   ];

//   datasFiltro.value = ["Empregado", "Desempregado"];
//   dadosFiltro.value = result;
// }

// const requests = async () => {
//   setGraficoDados();
// };

// onMounted(async () => {
//   if (users.value.length === 0) await getUsers();
//   await requests();
// });
</script>

<style lang="scss">
// @media (max-width: 1260px) {
//   .chart-mobile {
//     float: right;
//     left: 6.5rem;
//     position: relative;
//   }
// }
</style>

<style lang="sass" scoped></style>
