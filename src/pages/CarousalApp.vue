<template>
  <div class="flex flex-wrap w-full">
    <!-- <div class="w-full mt-5">
      <button @click="isShowing = !isShowing" class="m-auto w-full">
        Toggle text
      </button>
    </div> -->

    <transition>
      <h1 v-if="isShowing" class="w-full text-center text-3xl my-4">
        Carousel app
      </h1>
    </transition>

    <div
      class="relative w-full"
      v-for="(color, index) in colors"
      :key="color + index"
    >
      <transition>
        <div
          class="w-full absolute"
          v-if="index == currentColor"
          :class="getColor(color)"
          style="height: 350px"
        ></div>
      </transition>
      <div class="absolute w-full" style="height: 340px">
        <div class="absolute w-full bottom-0 flex justify-center">
          <div
            v-for="(item, index) in colors"
            :key="item"
            @click="makeCurrentColor(index)"
            class="w-4 h-4 rounded-full z-10 mx-2 cursor-pointer shadow-md"
            :class="currentColor == index ? 'bg-gray-700' : 'bg-gray-300'"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["blue", "yellow", "teal"],
      currentColor: 0,
      interval: null,
      isShowing: true,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentColor = (this.currentColor + 1) % this.colors.length;
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    makeCurrentColor(index) {
      this.currentColor = index;
    },
    getColor(color) {
      return `bg-${color}-500`;
    },
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>