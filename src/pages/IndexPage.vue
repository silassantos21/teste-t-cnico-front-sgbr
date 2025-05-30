<template>
  <q-page class="flex flex-center">
    <img
      class="rounded-lg"
      alt="Quasar logo"
      :src="imageSgbr"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script setup>
import imageSgbr from "../../public/image/sgbr.jpeg";
defineOptions({
  name: "IndexPage",
});
</script>
