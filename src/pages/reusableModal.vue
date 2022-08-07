<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="2xl my-5">Reusable modal</h1>
      <Modal v-if="isShown" @close="isShown = false">
        <template #header
          ><p class="text-red-500 text-2xl">this is the header text</p>
        </template>
      </Modal>
      <button @click="isShown = true">show</button>
    </div>
  </section>
</template>

<script>
import Modal from "../components/ModalComponent.vue";
import { ref } from "vue";

export default {
  components: {
    Modal,
  },
  setup() {
    const isShown = ref(false);
    return { isShown };
  },
};
</script>

<style>
</style>