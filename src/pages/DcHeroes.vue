<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center">Heroes: {{ heroesCount }}</h1>
    <ul>
      <li
        class="flex justify-between"
        v-for="(data, index) in heroes"
        v-bind:key="data.name"
      >
        hero{{ index + 1 }} : {{ data.name }}
        <span><button @click="removeHero(data.name)">x</button></span>
      </li>
    </ul>
    <div>
      <form action="" v-on:submit.prevent="onSubmit" class="mt-10">
        <input
          type="text"
          v-model.trim="hero.value"
          placeholder="enter hero name here"
          class="border rounded ml-2 pl-2"
          ref="hero"
        />
        <button
          type="submit"
          class="
            border
            rounded
            bg-gradient-to-r
            from-red-700
            to-pink-500
            text-sm text-white
          "
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
export default {
  setup() {
    const hero = ref("");
    const heroes = ref([
      { name: "batman" },
      { name: "superman" },
      { name: "flash" },
      { name: "aquaman" },
      { name: "wolverine" },
    ]);
    function removeHero(hero) {
      Object.keys(heroes.value).forEach((key) => {
        if (heroes.value[key] && heroes.value[key].name === hero) {
          heroes.value.splice(key, 1);
        }
      });
    }

    const heroesCount = computed({
      get: () => heroes.value.length,
    });

    function onSubmit(e) {
      e.preventDefault();
      hero.value.value
        ? heroes.value.push({ name: hero.value.value })
        : alert("enter hero name");
      hero.value.value = "";
    }

    onMounted(() => {
      hero.value.focus();
    });

    return { heroes, hero, removeHero, onSubmit, heroesCount };
  },
};
</script>

<style>
</style>