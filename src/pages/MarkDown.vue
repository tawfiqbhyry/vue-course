<template>
  <div class="flex w-full flex-wrap mb-10">
    <h1 class="w-full text-center text-3xl my-4">Markdown app</h1>
    <section class="flex m-auto w-10/12 h-screen">
      <textarea
        class="w-1/2 border p-5"
        :value="text"
        @input="update"
        ref="textarea"
      ></textarea>
      <article
        class="w-1/2 border bg-grey-100 p-5"
        v-html="markedText"
      ></article>
    </section>
  </div>
</template>

<script>
import { marked } from "marked";
import useDebounce from "../components/composition/useDebounce";
export default {
  data() {
    return {
      text: "",
      debounce: "",
    };
  },
  computed: {
    markedText() {
      return marked(this.text);
    },
  },
  methods: {
    update(e) {
      const func = () => {
        this.text = e.target.value;
      };
      this.debounce(func, 500);
    },
  },
  mounted() {
    this.debounce = useDebounce();
    this.$refs.textarea.focus();
  },
};
</script>

<style>
</style>